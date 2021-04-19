import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Invoice } from '../models/invoice.model';
import { AuthService } from './auth.service';
import { from, Observable } from 'rxjs';
import { ContractorService } from './contractor.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dbPath = '/invoices';
  private dbPathStatuses = '/invoiceStatuses';
  invoicesRef: AngularFirestoreCollection<Invoice> = null;
  invoicesForContractorsRef: AngularFirestoreCollection<Invoice> = null;
  // invoiceList: Observable<Invoice[]>;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _contractor: ContractorService
  ) {
    if (this._auth.isLoggedIn) {
      this.invoicesRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll(): Observable<any[]> {
    return this.invoicesRef.valueChanges();
  }

  getById(id: string): AngularFirestoreCollection<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection;
  }

  get(id: string): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) => q.where('_id', '==', id))
      .valueChanges();
  }

  getAllStatus(): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  getAllByStatus(statusId: string): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .where('_id', '==', statusId)
      )
      .valueChanges();
  }

  getAllByContractor(): Observable<any[]> {
    this.invoicesForContractorsRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this._auth.getUserId())
        .where(
          'contractor.info.unp',
          '==',
          this._contractor.getContractor().info.unp
        )
        .orderBy('_createdDate', 'desc')
    );
    return this.invoicesForContractorsRef.valueChanges();
  }

  add(invoice: Invoice) {
    invoice._userId = this._auth.getUserId();
    invoice._createdDate = new Date();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(invoice._id)
        .set(JSON.parse(JSON.stringify(invoice)))
    );
  }

  delete(_id: string): Promise<void> {
    return this.invoicesRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.invoicesRef.doc(_id).update(value);
  }
}
