import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Invoice, InvoiceStatus } from '../models/invoice.model';
import { AuthService } from './auth.service';
import { from, Observable } from 'rxjs';
import { ContractorService } from './contractor.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

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
    private _contractor: ContractorService,
    private _notification: NotificationService,
    private _route: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.invoicesRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll$(): Observable<any> {
    return this.invoicesRef.valueChanges();
  }

  getByI$d(id: string): AngularFirestoreCollection<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection;
  }

  get$(id: string): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) => q.where('_id', '==', id))
      .valueChanges();
  }

  getAllStatus$(): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  getAllByStatus$(statusId: string): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .where('_id', '==', statusId)
      )
      .valueChanges();
  }

  getAllByContractor$(): Observable<any[]> {
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

  add$(invoice: Invoice): Observable<any> {
    invoice._id = this._fs.createId();
    invoice._userId = this._auth.getUserId();
    invoice._createdDate = new Date();
    invoice.total.totalSum.amount = this.calculateTotalAmount(invoice);
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(invoice._id)
        .set(JSON.parse(JSON.stringify(invoice)))
        .then(() => {
          this._notification.success('Счет успешно создан');
          this._route.navigate(['invoices']);
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.invoicesRef
        .doc(_id)
        .delete()
        .then(() => {
          this._notification.success('Счет успешно удален');
        })
    );
  }

  update$(_id: string, value: any): Observable<void> {
    return from(this.invoicesRef.doc(_id).update(value));
  }

  calculateTotalAmount(invoice: Invoice): number {
    return _.sumBy(invoice.services, (o) => o.count * o.price);
  }
}
