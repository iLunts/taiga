import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QueryParams } from '@ngrx/data';
import { Subject } from 'rxjs';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import {
  RentalCertificateStatus,
  TotalSum,
} from 'src/app/models/rental-certificate.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-rental-certificate-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class RentalCertificateCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  private readonly destroySubject = new Subject();
  // rentalCertificate: RentalCertificate = new RentalCertificate(
  //   this.afs.createId()
  // );

  form: FormGroup;
  isEditingNumber: boolean;
  queryParams: QueryParams;

  constructor(
    private afs: AngularFirestore,
    private rentalCertificateService: RentalCertificateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private contractService: ContractService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(filter((params) => params?.contractorId))
      .subscribe((params) => {
        this.queryParams = params;
      });

    this.initQueryParams();

    this.companyService
      .getProfileCompany$()
      .pipe(
        filter((company) => !!company),
        distinctUntilChanged(),
        tap((company) =>
          this.form.controls.profileCompany.setValue(company[0])
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe();
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
      dateRange: new FormControl(
        new TuiDayRange(DateHelper.initDate(), DateHelper.initDate(6))
      ),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profileCompany: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      signature: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      total: new FormControl(new TotalSum(), [Validators.required]),
      type: new FormControl(1, [Validators.required]),
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
  }

  selectService(data: Service[]): void {
    this.form.controls.services.setValue(data);
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }
    this.rentalCertificateService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.invoice.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.invoice.list]);
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

  get getServicesDateRange(): string {
    const formatString = 'DD MMM YYYY';
    const dateRange = this.form.controls.services.value;
    moment.locale('ru');

    if (dateRange?.length) {
      return dateRange?.length === 1
        ? moment(DateHelper.getDayArray(dateRange[0].date)).format(formatString)
        : moment(DateHelper.getDayArray(dateRange[0].date)).format(
            formatString
          ) +
            ' по ' +
            moment(
              DateHelper.getDayArray(dateRange[dateRange.length - 1].date)
            ).format(formatString);
    } else {
      return null;
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
}
