import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { CompanyService } from 'src/app/services/company.service';
import { Contract } from 'src/app/models/contract.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import {
  RentalCertificate,
  RentalCertificateStatus,
  TotalSum
} from 'src/app/models/rental-certificate.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { Service } from 'src/app/models/service.model';
import { StoreService } from 'src/app/services/store.service';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { swallowErrors } from 'src/app/utils/rxjs.helper';

@Component({
  selector: 'app-rental-certificate-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class RentalCertificateCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  isEdit = false;
  form: FormGroup;

  queryParams$: Observable<Params>;
  invoice$: Observable<Invoice>;
  private readonly destroySubject = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private rentalCertificateService: RentalCertificateService,
    private router: Router,
    private storeService: StoreService
  ) {
    this.initForm();

    this.queryParams$ = this.activatedRoute.queryParams.pipe(
      filter((queryParams) => !!queryParams)
    );

    this.invoice$ = this.queryParams$.pipe(
      filter((params) => !!params && params.invoiceId),
      switchMap((params) =>
        this.invoiceService.getById$(params.invoiceId).pipe(swallowErrors())
      ),
      takeUntil(this.destroySubject)
    );

    this.invoice$
      .pipe(
        filter((invoice) => !!invoice),
        takeUntil(this.destroySubject)
      )
      .subscribe({
        next: (invoice) => {
          this.form.controls.number.setValue(invoice.number);
          this.form.controls.description.setValue(invoice.description);
          this.form.controls.contractor.setValue(invoice.contractor);
          this.form.controls._invoiceId.setValue(invoice._id);
          this.form.controls.services.setValue(invoice.services);
          this.form
            .get('dateRange')
            .setValue(
              DateHelper.convertDateRangeToTuiDayRange(invoice.dateRange)
            );
        }
      });

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((company: Company) => {
        this.form.controls.profileCompany.setValue(company);
      });

    this.storeService
      .getContractor$()
      .pipe(
        filter((contractor) => !!contractor),
        tap((contractor) => this.form.controls.contractor.setValue(contractor)),
        takeUntil(this.destroySubject),
        shareReplay()
      )
      .subscribe();

    this.activatedRoute.paramMap
      .pipe(
        map((params: any) => params.params),
        filter((params) => params.id),
        switchMap((params) =>
          this.rentalCertificateService
            .getById$(params.id)
            .pipe(swallowErrors())
        ),
        filter((rentalCertificate) => !!rentalCertificate),
        takeUntil(this.destroySubject)
      )
      .subscribe((rentalCertificate: RentalCertificate) => {
        this.setForm(rentalCertificate);
        this.isEdit = true;
      });

    this.activatedRoute.queryParams
      .pipe(
        filter((params) => !!params.cloneId),
        switchMap((params) =>
          this.rentalCertificateService
            .getById$(params.cloneId)
            .pipe(swallowErrors())
        ),
        withLatestFrom(this.activatedRoute.queryParams)
      )
      .subscribe(([rentalCertificate, params]) => {
        this.setForm(rentalCertificate);
        this.form?.patchValue({
          number: params?.lastIndex ? +params?.lastIndex + 1 : 1
        });
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = new FormGroup({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      _contractId: new FormControl(null),
      _invoiceId: new FormControl(null),
      contractor: new FormControl(null, [Validators.required]),
      contract: new FormControl(null, [Validators.required]),
      dateRange: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profileCompany: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null),
      services: new FormControl(null, [Validators.required]),
      signature: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      total: new FormControl(new TotalSum(), [Validators.required]),
      type: new FormControl(1, [Validators.required])
    });
  }

  get f(): any {
    return this.form.controls;
  }

  setStatus(data: RentalCertificateStatus): void {
    this.form.controls.status.setValue(data);
  }

  setContractor(data: Contractor): void {
    this.form.controls.contractor.setValue(data);
    this.form.controls.contract.reset();
  }

  setContract(data: Contract): void {
    this.form.controls.contract.setValue(data);
    this.form.controls._contractId.setValue(data?._id);
  }

  setService(data: Service[]): void {
    this.form.controls.services.patchValue(data);
    this.form.controls.services.markAsDirty();
  }

  setForm(data: RentalCertificate): void {
    this.form.patchValue(data);
    this.form
      .get('dateRange')
      .setValue(DateHelper.convertDateRangeToTuiDayRange(data.dateRange));
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }
    this.rentalCertificateService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.rentalCertificate.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.rentalCertificate.list]);
  }

  get getQrCode(): any {
    if (this.isQrCodeValid) {
      return this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    } else {
      return null;
    }
  }

  get isQrCodeValid(): boolean {
    return (
      this.qrBlock && this.qrBlock.qrcElement.nativeElement.childNodes.length
    );
  }
}
