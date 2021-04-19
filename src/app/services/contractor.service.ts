import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Contractor, } from '../models/contractor.model';
import { Observable, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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
  ) {
    if (this._auth.isLoggedIn) {
      this.customersRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
  }

  getAll(): AngularFirestoreCollection<Contractor> {
    return this.customersRef;
  }

  getById(id: string): AngularFirestoreCollection<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection;
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

  add(contractor: any): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    contractor._userId = this._auth.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contractor)))
    );
  }

  delete(_id: string): Promise<void> {
    return this.customersRef.doc(_id).delete();
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
