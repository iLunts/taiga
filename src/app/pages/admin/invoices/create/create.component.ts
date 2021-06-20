import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Contractor } from 'src/app/models/company.model';
import { environment } from 'src/environments/environment';
import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import * as moment from 'moment';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('qrBlock') qrBlock: any;

  invoice: Invoice = new Invoice(this.afs.createId());
  form: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private invoiceService: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.formBuilder.group({
      number: new FormControl(1, [Validators.required]),
      date: new FormControl(
        new TuiDayRange(this.initDate(0), this.initDate(6))
      ),
      logotype: new FormControl(null, [Validators.required]),
    });
  }

  get f(): any{
    return this.form.controls;
  }

  initDate(increment: number): TuiDay {
    return TuiDay.normalizeParse(moment().add(increment, 'day').format('DD.MM.YYYY'));
  }

  setStatus(data: InvoiceStatus): void {
    if (this.invoice) {
      this.invoice.status = data;
    }
  }

  setContractor(data: Contractor): void {
    if (this.invoice) {
      this.invoice.contractor = data;
    }
  }

  setService(data: Service[]): void {
    if (this.invoice) {
      this.invoice.services = data;
    }
  }

  save(): void {
    if (this.qrBlock) {
      this.invoice.qrCode =
        this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    }

    this.invoiceService.add$(this.invoice).subscribe((response) => {
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

  ngAfterViewInit(): void {
    // if (this.qrBlock) {
    //   debugger;
    //   this.invoice.qrCode = this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    // }
  }
}
