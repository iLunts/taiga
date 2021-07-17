import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Contractor } from '../models/company.model';
import { Observable, from } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  private dbPath = '/contractors';
  customersRef: AngularFirestoreCollection<Contractor> = null;
  customersExistRef: AngularFirestoreCollection<Contractor> = null;
  dbRef: AngularFirestoreCollection<Contractor> = null;

  selectedContractor: Contractor;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _notification: NotificationService
  ) {
    if (this._auth.isLoggedIn) {
      this.customersRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
  }

  // getAll$(): AngularFirestoreCollection<Contractor> {
  getAll$(): Observable<Contractor[]> {
    return this.customersRef.valueChanges();
  }

  // getById(id: string): AngularFirestoreCollection<any> {
  getById$(id: string): Observable<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection.valueChanges();
  }

  checkExistContactorByUNP(unp): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .where('info.unp', '==', unp)
      )
      .valueChanges();
  }

  add$(contractor: any): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    contractor._userId = this._auth.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contractor)))
        .then(() => {
          this._notification.success('Контрагент успешно создан');
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.customersRef
        .doc(_id)
        .delete()
        .then(() => {
          this._notification.success('Контрагент успешно удалён');
        })
    );
  }

  update(_id: string, value: any): Promise<void> {
    return this.customersRef.doc(_id).update(value);
  }

  setContractor(contractor: Contractor): void {
    this.selectedContractor = contractor;
  }

  getContractor(): Contractor {
    return this.selectedContractor;
  }
}
