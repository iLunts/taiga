import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private dbPath = '/services';
  servicesRef: AngularFirestoreCollection<Service> = null;
  dbRef: AngularFirestoreCollection<Service> = null;

  constructor(private _fs: AngularFirestore, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.servicesRef = _fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }
  }

  getAll$(): Observable<Service[]> {
    return this.servicesRef.valueChanges();
  }

  getByName$(name: string): AngularFirestoreCollection<Service> {
    return this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('name', '>=', name)
    );
  }

  add(service: Service) {
    const pushkey = this._fs.createId();
    service._id = pushkey;
    service._userId = this.authService.getUserId();
    return this._fs
      .collection(this.dbPath)
      .doc(pushkey)
      .set({ ...service });
  }

  delete(_id: string): Promise<void> {
    if (!_id) {
      return;
    }
    return this.servicesRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.servicesRef.doc(_id).update(value);
  }
}
