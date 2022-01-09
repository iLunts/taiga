import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  takeUntil,
  tap
} from 'rxjs/operators';
import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { TotalSum } from 'src/app/models/act.model';
import { ActService } from 'src/app/services/act.service';
import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Contract } from 'src/app/models/contract.model';
import { environment } from 'src/environments/environment';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { StoreService } from 'src/app/services/store.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-act-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class ActCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  private readonly destroySubject = new Subject();
  // act: Act = new Act(this.afs.createId());
  form: FormGroup;
  isEditingNumber: boolean;
  queryParams: Params;

  constructor(
    private afs: AngularFirestore,
    private actService: ActService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private rentalCertificateService: RentalCertificateService,
    private storeService: StoreService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(
        tap((queryParams) => this.initQueryParams(queryParams)),
        takeUntil(this.destroySubject)
      )
      .subscribe();

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
      date: new FormControl(this.initDate(0)),
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

  initQueryParams(queryParams: Params): void {
    this.queryParams = queryParams;

    if (this.queryParams?.rentalCertificateId) {
      this.rentalCertificateService
        .getById$(this.queryParams?.rentalCertificateId.toString())
        .pipe(
          filter((rentalCertificate) => !!rentalCertificate),
          tap((rentalCertificate) => {
            this.form.controls.status.setValue(rentalCertificate[0].status);

            // TODO: Need connect this part
            // this.form.controls.services.patchValue(
            //   rentalCertificate[0].services
            // );
          }),
          takeUntil(this.destroySubject)
        )
        .subscribe();
    }
    if (this.queryParams?.invoiceId) {
      this.invoiceService
        .getById$(this.queryParams?.invoiceId.toString())
        .pipe(takeUntil(this.destroySubject))
        .subscribe((response: Invoice) => {
          const invoice: Invoice = response;
          this.form.controls.number.setValue(invoice.number);
          this.form.controls.contractor.setValue(invoice.contractor);
          this.form.controls._invoiceId.setValue(this.queryParams?.invoiceId);
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
    this.form.controls.services.setValue(data);
    this.form.controls.services.markAsDirty();
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
    // if (this.form.dirty) {
    // } else {
    //   this.router.navigate([environment.routing.admin.invoice.list]);
    // }

    this.router.navigate([environment.routing.admin.act.list]);
  }

  get isActValid(): boolean {
    // TODO: Need add function for checking Act data
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

  toggleInvoiceNumber(): void {
    this.isEditingNumber = !this.isEditingNumber;
  }

  onFocusedChange(focused: boolean): void {
    if (!focused) {
      this.isEditingNumber = false;
    }
  }
}
