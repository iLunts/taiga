import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Contractor, ContractorInfo } from '../models/company.model';
import { NotificationService } from './notification.service';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private dbPath = '/contractors';
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;
  customersRef: AngularFirestoreCollection<Contractor> = null;
  customersExistRef: AngularFirestoreCollection<Contractor> = null;
  dbRef: AngularFirestoreCollection<Contractor> = null;

  selectedContractor: Contractor;
  contractor$ = new BehaviorSubject<Contractor>(new Contractor());

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.customersRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
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
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('_id', '==', id)
    );
    return collection.valueChanges();
  }

  checkExistContactorByUNP(unp): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .where('info.unp', '==', unp)
      )
      .valueChanges();
  }

  add$(contractor: any): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    contractor._userId = this.authService.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contractor)))
        .then(() => {
          this.notificationService.success('Контрагент успешно создан');
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.customersRef
        .doc(_id)
        .delete()
        .then(() => {
          this.notificationService.success('Контрагент успешно удалён');
        })
    );
  }

  update$(_id: string, value: any): Observable<any> {
    return of(this.customersRef.doc(_id).update(value));
  }

  getContractorState$(): Observable<Contractor> {
    return this.contractor$.asObservable();
  }

  setContractor(contractor: Contractor): void {
    this.contractor$.next(contractor);
  }

  clearContractor(): void {
    this.setContractor(new Contractor());
  }

  getContractor(): Contractor {
    if (this.contractor$.getValue()) {
      return this.contractor$.getValue();
    } else {
      this.setContractor(new Contractor());
    }
  }

  isJuridicalAndMailingAddressSame(contractor: Contractor): boolean {
    return _.isEqual(contractor.juridicalAddress, contractor.mailingAddress);
  }

  getAddressToString(
    contractor: Contractor,
    type: 'juridical' | 'mailing' = 'juridical'
  ): string {
    let address = '';
    const typeVar =
      type === 'juridical' ? 'juridicalAddress' : 'mailingAddress';

    address += contractor[typeVar].country
      ? contractor[typeVar].country + ' '
      : '';
    address += contractor[typeVar].zipCode
      ? contractor[typeVar].zipCode + ' '
      : '';
    address += contractor[typeVar].vnsfull
      ? contractor[typeVar].vnsfull + ' '
      : '';
    address += contractor[typeVar].streetType
      ? contractor[typeVar].streetType + ' '
      : '';
    address += contractor[typeVar].street
      ? contractor[typeVar].street + ' '
      : '';
    address += contractor[typeVar].houseNumber
      ? contractor[typeVar].houseNumber + ' '
      : '';
    address += contractor[typeVar].officeType
      ? contractor[typeVar].officeType + ' '
      : '';
    address += contractor[typeVar].office
      ? contractor[typeVar].office + ' '
      : '';

    if (contractor[typeVar]?.email) {
      address += '<br />';

      address += contractor[typeVar]?.email
        ? contractor[typeVar]?.email + ' '
        : '';
    }

    return address;
  }

  getBankInfoToString(contractor: Contractor): string {
    let bankInfo = '';

    bankInfo += contractor.bankAccount.bank.AdrBank
      ? contractor.bankAccount.bank.AdrBank + ' '
      : '';
    bankInfo += contractor.bankAccount.bank.typ
      ? contractor.bankAccount.bank.typ + ' '
      : '';
    bankInfo += contractor.bankAccount.bank.NmBankShort
      ? contractor.bankAccount.bank.NmBankShort + '<br />'
      : '';
    bankInfo += contractor.bankAccount.bank.CDBank
      ? 'БИК (BIC): ' + contractor.bankAccount.bank.CDBank + '<br />'
      : '';
    bankInfo += contractor.bankAccount.SWIFT
      ? 'Р/сч. (SWIFT): ' + contractor.bankAccount.SWIFT
      : '';

    return bankInfo;
  }

  checkContractorValid$(): Observable<boolean> {
    return this.contractor$.pipe(
      filter((contractor) => !!contractor),
      switchMap((contractor: Contractor) =>
        of(
          this.checkContractorInfoValid(contractor) &&
            this.checkContractorBankValid(contractor) &&
            this.checkContractorSwiftValid(contractor.bankAccount.SWIFT)
        )
      )
    );
  }

  checkContractorInfoValid(contractor: Contractor): boolean {
    return Object.values(contractor.info).every(
      (info: ContractorInfo) => info !== null
    );
  }

  checkContractorBankValid(contractor: Contractor): boolean {
    const bank = contractor?.bankAccount?.bank;
    let status = true;

    if (
      !bank ||
      !bank.CDBank ||
      !bank.NmBankShort ||
      !bank.CDHeadBank ||
      !bank.AdrBank ||
      bank.CdControl === 'ЗАКР'
    ) {
      status = false;
    }

    return status;
  }

  checkContractorSwiftValid(swift: string): boolean {
    return this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, ''));
  }
}
