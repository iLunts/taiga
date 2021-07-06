import {
  ChangeDetectionStrategy,
  Component,
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
import { ActivatedRoute, Router } from '@angular/router';

import { Contractor } from 'src/app/models/company.model';
import { environment } from 'src/environments/environment';
import { Invoice, InvoiceStatus, TotalSum } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import * as moment from 'moment';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { DateHelper } from 'src/app/utils/date.helper';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesCreateComponent implements OnInit {
  @ViewChild('qrBlock') qrBlock: any;
  @ViewChild('inputNumber') inputNumber: any;

  invoice: Invoice = new Invoice(this.afs.createId());
  form: FormGroup;
  isEditingNumber: boolean;

  constructor(
    private afs: AngularFirestore,
    private invoiceService: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      contractor: new FormControl(null, [Validators.required]),
      dateRange: new FormControl(
        new TuiDayRange(DateHelper.initDate(), DateHelper.initDate(6))
      ),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profile: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      signature: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      total: new FormControl(new TotalSum(), [Validators.required]),
      type: new FormControl(1, [Validators.required]),
    });
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
