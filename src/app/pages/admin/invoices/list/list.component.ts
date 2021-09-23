import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoicesListComponent implements OnInit {
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
  invoices$: Observable<Invoice[]>;
  invoiceStatuses$: Observable<any[]>;
  isLoaded: boolean;
  routing = environment.routing;

  constructor(
    private invoiceService: InvoiceService,
    private templatePdfService: TemplatePdfService
  ) {}

  ngOnInit(): void {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this.invoiceService.getAllStatus$();
  }

  fetch(): void {
    this.invoices$ = this.invoiceService.getAll$();
  }

  delete(item: Invoice): void {
    if (item) {
      this.invoiceService.delete$(item._id);
    }
  }

  downloadPdf(data: Invoice): void {
    this.templatePdfService.downloadPdf('invoice', data);
  }

  createBaseOnContract(invoice: Invoice): void {}

  createBaseOnAct(invoice: Invoice): void {}

  createBaseOnReference(invoice: Invoice): void {}
}
