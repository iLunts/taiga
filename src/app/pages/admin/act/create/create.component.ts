import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@ngrx/data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { Act, ActStatus, TotalSum } from 'src/app/models/act.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Service } from 'src/app/models/service.model';
import { ActService } from 'src/app/services/act.service';
import { CompanyService } from 'src/app/services/company.service';
// import { ContractService } from 'src/app/services/contract.service';
// import { DateHelper } from 'src/app/utils/date.helper';
import { ContractorService } from 'src/app/services/contractor.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-act-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ActCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  private readonly destroy$ = new Subject();
  act: Act = new Act(this.afs.createId());
  form: FormGroup;
  isEditingNumber: boolean;
  queryParams: QueryParams;

  constructor(
    private afs: AngularFirestore,
    private actService: ActService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private contractorService: ContractorService // private contractService: ContractService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.queryParams = params;
      });

    this.initQueryParams();

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company[]) => {
        if (company?.length) {
          this.act.profileCompany = company[0];
          this.form.controls.profileCompany.setValue(company[0]);
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      _contractId: new FormControl(null),
      _invoiceId: new FormControl(null),
      contractor: new FormControl(null, [Validators.required]),
      date: new FormControl(this.initDate(0)),
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
    if (this.queryParams?.invoiceId) {
      this.invoiceService
        .getById$(this.queryParams?.invoiceId.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe((invoices: Invoice[]) => {
          if (invoices?.length) {
            const invoice: Invoice = invoices[0];

            this.form.controls.number.setValue(invoice.number);
            this.form.controls.contractor.setValue(invoice.contractor);
            // this.form.controls.services.setValue(invoice.services);
            this.form.controls._invoiceId.setValue(this.queryParams?.invoiceId);

            this.setService(invoice.services);
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

  setStatus(data: ActStatus): void {
    if (this.act) {
      this.act.status = data;
      this.form.controls.status.setValue(data);
    }
  }

  setContractor(data: Contractor): void {
    if (this.act) {
      this.act.contractor = data;
      this.form.controls.contractor.setValue(data);
    }
  }

  setService(data: Service[]): void {
    if (this.act) {
      this.act.services = data;
      this.form.controls.services.setValue(data);
    }
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }
    this.actService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.invoice.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.invoice.list]);
  }

  get isActValid(): boolean {
    if (this.act) {
      return this.act.isValid(this.act);
    } else {
      return false;
    }
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
