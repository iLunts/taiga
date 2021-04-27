import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class InvoicesCreateComponent implements OnInit {
  invoice: Invoice = new Invoice();

  constructor() {}

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
}
