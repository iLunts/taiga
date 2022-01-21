import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of,
  Subject
} from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import {
  Company,
  CompanyAddress,
  CompanyInfo,
  ResponsiblePerson
} from '../models/company.model';
import { NotificationService } from './notification.service';
import { Bank, BankAccount } from '../models/bank.model';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyStorageService implements OnDestroy {
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null;
  private readonly destroySubject = new Subject();
  private companySubject = new BehaviorSubject<Company>(new Company());
  company$: Observable<Company> = this.companySubject.asObservable();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.afs
        .collection(this.dbPath, (q) =>
          q.where('_userId', '==', this.authService.getUserId())
        )
        .valueChanges()
        .pipe(
          first(),
          map((company: Company[]) => company[0]),
          takeUntil(this.destroySubject)
        )
        .subscribe((company: Company) => this.companySubject.next(company));
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  getCompany$(): Observable<Company> {
    return this.company$;
  }

  getCompanyValue(): Company {
    return this.companySubject.getValue();
  }

  setCompany(company: Company): void {
    this.companySubject.next(company);
  }

  update$(_id: string, company: any): Observable<void> {
    debugger;
    return from(
      this.afs
        .collection(this.dbPath)
        .doc(_id)
        .update(JSON.parse(JSON.stringify(company)))
        .then(() => {
          this.notificationService.success('Компания успешно обнавлена');
        })
    );
  }
}
