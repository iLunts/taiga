import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  takeUntil,
  tap
} from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
// import { QueryParams } from '@ngrx/data';
import { Subject } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { CompanyService } from 'src/app/services/company.service';
import { Contract } from 'src/app/models/contract.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import {
  RentalCertificateStatus,
  TotalSum
} from 'src/app/models/rental-certificate.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { Service } from 'src/app/models/service.model';
import { StoreService } from 'src/app/services/store.service';

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
  queryParams: Params;
  dateRangeControl: FormControl = new FormControl({
    value: null,
    disabled: true
  });

  constructor(
    private afs: AngularFirestore,
    private rentalCertificateService: RentalCertificateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private storeService: StoreService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(filter((params) => params?.contractorId))
      .subscribe((params) => {
        this.queryParams = params;
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

    this.initQueryParams();
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
      contractor: new FormControl(null, [Validators.required]),
      contract: new FormControl(null, [Validators.required]),
      dateRange: new FormControl(null),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profileCompany: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      signature: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      total: new FormControl(new TotalSum(), [Validators.required]),
      type: new FormControl(1, [Validators.required])
    });
  }

  initQueryParams(): void {
    if (this.queryParams?.contractorId) {
      this.contractorService
        .getById$(this.queryParams.contractorId.toString())
        .pipe(takeUntil(this.destroySubject))
        .subscribe((contractor: Contractor[]) => {
          if (contractor.length) {
            this.form.controls.contractor.setValue(contractor[0]);
            // this.rentalCertificate.contractor = contractor[0];
            this.form.controls._contractId.setValue(
              this.queryParams?.contractorId
            );
          }
        });
    }
  }

  get f(): any {
    return this.form.controls;
  }

  initDate(increment: number): TuiDay {
    return TuiDay.normalizeParse(
      moment().add(increment, 'day').format('DD.MM.YYYY')
    );
  }

  selectStatus(data: RentalCertificateStatus): void {
    this.form.controls.status.setValue(data);
  }

  selectContractor(data: Contractor): void {
    this.form.controls.contractor.setValue(data);
    this.form.controls.contract.reset();
  }

  setContract(data: Contract): void {
    this.form.controls.contract.setValue(data);
    this.form.controls._contractId.setValue(data._id);
  }

  selectService(data: Service[]): void {
    this.form.controls.services.setValue(data);
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

  get isRentalCertificateValid(): boolean {
    // if (this.rentalCertificate) {
    // return this.rentalCertificate.isValid(this.rentalCertificate);
    // } else {
    //   return false;
    // }
    // TODO: Need to change
    // return this.form.valid;
    return true;
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

  toggleRentalCertificateNumber(): void {
    this.isEditingNumber = !this.isEditingNumber;
  }

  onFocusedChange(focused: boolean): void {
    if (!focused) {
      this.isEditingNumber = false;
    }
  }
}
