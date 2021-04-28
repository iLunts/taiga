import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/fileUpload.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(
    private _afStorage: AngularFireStorage,
    private _afDB: AngularFireDatabase,
    private _auth: AuthService,
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this._afStorage.ref(filePath);
    const uploadTask = this._afStorage.upload(
      filePath,
      fileUpload?.file || null
    );

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            fileUpload._userId = this._auth.getUserId();
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this._afDB.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems): AngularFireList<FileUpload> {
    return this._afDB.list(this.basePath, (ref) =>
      ref.limitToLast(numberItems)
    );
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this._afDB.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this._afStorage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
