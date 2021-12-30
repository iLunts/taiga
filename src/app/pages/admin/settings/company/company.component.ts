import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { iif, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyStore } from 'src/app/stores/company.store';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit, OnDestroy {
  private readonly destroySubject = new Subject();
  private actionSaveSubject = new Subject<void>();
  company$: Observable<Company> = new Observable<Company>();
  valid$: Observable<boolean>;
  isCannotBeEmpty: boolean;

  constructor(
    // private companyService: CompanyService,
    public companyStore: CompanyStore,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(filter((params) => params.cannotBeEmpty))
      .subscribe((params) => {
        this.isCannotBeEmpty = true;
      });

    this.company$ = this.companyStore.company$;

    // this.company$ = this.companyService.getCompany$().pipe(
    //   distinctUntilChanged((a, b) => _.isEqual(a, b)),
    //   // tap((data) => console.warn('Settings company - main call: ', data)),
    //   // debug(LogginLevel.DEBUG, "Loading participant from backend"),
    //   shareReplay()
    // );

    // this.actionSaveSubject
    //   .pipe(
    //     withLatestFrom(this.company$),
    //     map(([, company]) => company),
    //     switchMap((company: Company) =>
    //       iif(
    //         () => !!company._id,
    //         this.companyService.add$(company),
    //         this.companyService.update$(company._id, company)
    //       )
    //     ),
    //     takeUntil(this.destroySubject)
    //   )
    //   .subscribe();

    // this.valid$ = this.company$.pipe(
    //   filter((company) => !!company),
    //   switchMap((company) => this.companyService.checkCompanyValid$(company)),
    //   takeUntil(this.destroySubject)
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    // this.companyService.clearCompany();

    this.actionSaveSubject.complete();
  }

  save(): void {
    this.actionSaveSubject.next();
  }
}
