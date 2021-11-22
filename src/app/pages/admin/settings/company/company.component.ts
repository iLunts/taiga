import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { iif, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { QueryParams } from '@ngrx/data';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit, OnDestroy {
  private readonly destroySubject = new Subject();
  isCompanyValid: boolean;
  company$: Observable<Company>;
  private actionCompanySubject = new Subject<void>();
  // queryParams: QueryParams;
  isCannotBeEmpty: boolean;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      .pipe(filter((params) => params.cannotBeEmpty))
      .subscribe((params) => {
        this.isCannotBeEmpty = true;
      });

    this.getProfileCompany$();

    this.company$ = this.companyService.getCompany$().pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(() => console.log('Get company$'))
    );

    this.actionCompanySubject
      .pipe(
        withLatestFrom(this.company$),
        map(([, company]) => company),
        switchMap((company: Company) =>
          iif(() => !!company._id, this.save$(company), this.update$(company))
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.companyService.clearCompany();
  }

  save(): void {
    this.actionCompanySubject.next();
  }

  save$(company: Company): Observable<any> {
    return this.companyService.add$(company);
  }

  update$(company: Company): Observable<any> {
    return this.companyService.update$(company._id, company);
  }

  getProfileCompany$(): void {
    this.companyService
      .getProfileCompany$()
      .pipe(
        filter((company: Company) => !!company),
        distinctUntilChanged((a, b) => _.isEqual(a, b)),
        tap((company) => console.log('company: ', company)),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }
}
