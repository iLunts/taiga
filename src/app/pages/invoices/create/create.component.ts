import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contractor } from 'src/app/models/company.model';
import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { Service } from 'src/app/models/service.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoicesCreateComponent implements OnInit {
  @ViewChild('qrBlock') qrBlock: any;

  invoice: Invoice = new Invoice(this.afs.createId());

  constructor(
    private afs: AngularFirestore,
    private invoiceService: InvoiceService,
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
}
