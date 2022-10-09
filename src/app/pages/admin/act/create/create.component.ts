import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { TotalSum } from 'src/app/models/act.model';
import { ActService } from 'src/app/services/act.service';
import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Contract } from 'src/app/models/contract.model';
import { environment } from 'src/environments/environment';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import { StoreService } from 'src/app/services/store.service';
import { Status } from 'src/app/models/status.model';
import { DateHelper } from 'src/app/utils/date.helper';
import { swallowErrors } from 'src/app/utils/rxjs.helper';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { ServiceHelper } from 'src/app/utils/service.helper';

@Component({
  selector: 'app-act-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class ActCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  form: FormGroup;
  isEditingNumber: boolean;

  private destroySubject = new Subject();
  queryParams$: Observable<Params>;
  invoice$: Observable<Invoice>;

  constructor(
    private afs: AngularFirestore,
    private actService: ActService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private rentalCertificateService: RentalCertificateService,
    private storeService: StoreService
  ) {
    this.initForm();

    this.queryParams$ = this.activatedRoute.queryParams.pipe(
      filter((queryParams) => !!queryParams)
    );

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
        distinctUntilChanged(),
        tap((contractor) => this.form.controls.contractor.setValue(contractor)),
        takeUntil(this.destroySubject),
        shareReplay()
      )
      .subscribe();

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
          this.form.controls.contractor.setValue(invoice.contractor);
          this.form.controls._invoiceId.setValue(invoice._id);
          this.form.controls.services.setValue(invoice.services);
        }
      });

    this.activatedRoute.queryParams
      .pipe(
        filter((params) => !!params.rentalCertificateId),
        switchMap((params) =>
          this.rentalCertificateService
            .getById$(params.rentalCertificateId)
            .pipe(swallowErrors())
        )
      )
      .subscribe((rentalCertificate) => {
        // this.setForm(invoice);
        this.form
          .get('services')
          .setValue(
            ServiceHelper.convertServicesToSummaryServices(
              rentalCertificate.services
            )
          );
        this.form
          .get('date')
          .setValue(
            DateHelper.convertDateToTuiDay(rentalCertificate.dateRange.to)
          );
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
      date: new FormControl(DateHelper.initTuiDay(0)),
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

  setStatus(data: Status): void {
    this.form.controls.status.setValue(data);
    this.form.controls.status.markAsDirty();
  }

  setContractor(data: Contractor): void {
    this.form.controls.contractor.setValue(data);
    this.form.controls.contract.reset();
  }

  setContract(data: Contract): void {
    this.form.controls.contract.setValue(data);
    this.form.controls.contract.markAsDirty();
  }

  setService(data: Service[]): void {
    this.form.controls.services.patchValue(data);
    this.form.controls.services.markAsDirty();

    if (data) {
      const tuiDayList = [];
      data.forEach((element) => {
        tuiDayList.push(
          new Date(element.date.year, element.date.month, element.date.day)
        );
      });

      this.form.get('date').setValue(DateHelper.getLastDay(tuiDayList));
    }
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }
    this.actService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.act.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.act.list]);
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
