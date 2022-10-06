import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { CompanyService } from 'src/app/services/company.service';
import { Contract } from 'src/app/models/contract.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import {
  RentalCertificateStatus,
  TotalSum
} from 'src/app/models/rental-certificate.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { Service } from 'src/app/models/service.model';
import { StoreService } from 'src/app/services/store.service';
import * as _ from 'lodash';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-rental-certificate-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class RentalCertificateCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  private readonly destroySubject = new Subject();

  form: FormGroup;
  isEditingNumber: boolean;
  // queryParams: Params;
  dateRangeControl: FormControl = new FormControl({
    value: null,
    disabled: true
  });

  queryParams$: Observable<Params>;
  invoice$: Observable<Invoice>;

  constructor(
    private afs: AngularFirestore,
    private rentalCertificateService: RentalCertificateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private storeService: StoreService,
    private invoiceService: InvoiceService
  ) {
    this.initForm();

    this.queryParams$ = this.activatedRoute.queryParams.pipe(
      filter((queryParams) => !!queryParams)
    );

    this.invoice$ = this.queryParams$.pipe(
      filter((params) => !!params && params.invoiceId),
      switchMap((params) => this.invoiceService.getById$(params.invoiceId)),
      takeUntil(this.destroySubject)
    );

    // this.route.queryParams
    //   .pipe(filter((params) => params?.contractorId))
    //   .subscribe((params) => {
    //     this.queryParams = params;
    //   });

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

    // this.form.valueChanges
    //   .pipe(
    //     distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    //     filter((form) => !!form && !!form.services && !form.services.length),
    //     tap((form) => {
    //       const temp = this.getRangeDate();
    //       console.log('Date ranges: ', temp);
    //       // console.log('Form changed: ', form);
    //     })
    //   )
    //   .subscribe();

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
          // this.form.controls.services.setValue(invoice.services);
          this.form.controls.description.setValue(invoice.description);
          this.form.controls.description.setValue(invoice.description);

          this.setService(invoice.services);

          // this.initDate();
        }
      });

    // this.initQueryParams();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
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

  // initDate(): TuiDay {
  //   // this.
  //   // return TuiDay.normalizeParse(moment().add(1, 'day').format('DD.MM.YYYY'));

  //   // return GetLastDay();
  //   return null;
  // }

  setStatus(data: RentalCertificateStatus): void {
    this.form.controls.status.setValue(data);
  }

  setContractor(data: Contractor): void {
    this.form.controls.contractor.setValue(data);
    this.form.controls.contract.reset();
  }

  setContract(data: Contract): void {
    this.form.controls.contract.setValue(data);
    this.form.controls._contractId.setValue(data._id);
  }

  setService(data: Service[]): void {
    this.form.controls.services.patchValue(data);
    this.form.controls.services.markAsDirty();

    if (data && data.length) {
      // const tuiDayList = [];
      // const tuiDateList = DateHelper.getTuiDateArrayFromService(data);

      // this.form.get('dateRange').patchValue({
      //   from: DateHelper.getFirstTuiDay(tuiDateList),
      //   to: DateHelper.getLastTuiDay(tuiDateList)
      // });
      this.form
        .get('dateRange')
        .patchValue(DateHelper.getTuiDayRangeFromServices(data));

      this.form.get('dateRange').value;
      // this.dateRangeControl.setValue(
      //   DateHelper.getTuiDayRangeFromServices(data)
      // );
      // console.log('dateRange: ', this.form.get('dateRange').value);
      // debugger;
    }
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

  getRangeDate(): Date[] {
    if (this.f.services?.value?.length > 1) {
      let dates: Date[] = DateHelper.getRangeDaysFromServices(
        this.f.services.value
      );
      if (moment(dates[0]).isSame(dates[1])) {
        dates = [dates[0]];
      }
      this.f.dateRange.setValue(dates);
      return dates;
    } else {
      const date = [DateHelper.getMinDayFromServices(this.f.services.value)];
      this.f.dateRange.setValue(date);
      return date;
    }
  }

  toggleRentalCertificateNumber(): void {
    this.isEditingNumber = !this.isEditingNumber;
  }

  onFocusedChange(focused: boolean): void {
    if (!focused) {
      this.isEditingNumber = false;
    }
  }

  get getRangeDatesString(): string {
    const dates = this.getRangeDate();
    const format = 'DD MMM yyyy';
    moment.locale('ru');

    return dates.length > 1
      ? 'c ' +
          moment(dates[0]).format(format) +
          ' по ' +
          moment(dates[1]).format(format)
      : 'за ' + moment(dates[0]).format(format);
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
