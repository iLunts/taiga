import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Invoice, InvoiceStatus, TotalSum } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { QueryParams } from '@ngrx/data';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  private readonly destroy$ = new Subject();
  invoice: Invoice = new Invoice(this.afs.createId());
  form: FormGroup;
  isEditingNumber: boolean;
  queryParams: QueryParams;

  constructor(
    private afs: AngularFirestore,
    private invoiceService: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private contractService: ContractService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(filter((params) => params.contractorId))
      .subscribe((params) => {
        this.queryParams = params;
      });

    this.initQueryParams();

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company[]) => {
        if (company?.length) {
          this.invoice.profileCompany = company[0];
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
    if (this.queryParams.contractorId) {
      this.contractorService
        .getById$(this.queryParams.contractorId.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe((contractor: Contractor[]) => {
          if (contractor.length) {
            this.form.controls.contractor.setValue(contractor[0]);
            this.invoice.contractor = contractor[0];
          }
        });
    }
    // if (this.queryParams.contractId) {
    //   this.contractorService
    //     .getById$(this.queryParams.contractorId.toString())
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((contractor: Contractor[]) => {
    //       if (contractor.length) {
    //         this.form.controls.contractor.setValue(contractor[0]);
    //         this.invoice.contractor = contractor[0];
    //       }
    //     });
    // }
  }

  get f(): any {
    return this.form.controls;
  }

  initDate(increment: number): TuiDay {
    return TuiDay.normalizeParse(
      moment().add(increment, 'day').format('DD.MM.YYYY')
    );
  }

  setStatus(data: InvoiceStatus): void {
    if (this.invoice) {
      this.invoice.status = data;
      this.form.controls.status.setValue(data);
    }
  }

  setContractor(data: Contractor): void {
    if (this.invoice) {
      this.invoice.contractor = data;
      this.form.controls.contractor.setValue(data);
    }
  }

  setService(data: Service[]): void {
    if (this.invoice) {
      this.invoice.services = data;
      this.form.controls.services.setValue(data);
    }
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }
    this.invoiceService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.invoice.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.invoice.list]);
  }

  get isInvoiceValid(): boolean {
    if (this.invoice) {
      return this.invoice.isValid(this.invoice);
    } else {
      return false;
    }
  }

  toggleInvoiceNumber(): void {
    this.isEditingNumber = !this.isEditingNumber;
  }

  onFocusedChange(focused: boolean): void {
    if (!focused) {
      this.isEditingNumber = false;
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
}
