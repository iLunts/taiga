import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Contractor } from 'src/app/models/company.model';
import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { Service } from 'src/app/models/service.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('qrBlock') qrBlock: any;

  invoice: Invoice = new Invoice(this.afs.createId());

  constructor(
    private afs: AngularFirestore,
    private invoiceService: InvoiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

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
      this.invoice.qrCode = this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    }

    this.invoiceService.add$(this.invoice);
  }

  cancel(): void {
    this.router.navigate([environment.routing.invoiceList]);
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
