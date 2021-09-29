import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoicesListComponent implements OnInit {
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
  invoices$: Observable<any>;
  invoiceStatuses$: Observable<any>;
  isLoaded: boolean;
  routing = environment.routing;
  // readonly tabs = ['Все', 'Черновики', 'Оплаченные'];
  // activeElement = String(this.tabs[0]);
  activeElement: InvoiceStatus;

  constructor(
    private invoiceService: InvoiceService,
    private templatePdfService: TemplatePdfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchStatuses();
    this.fetch();
  }

  get activeItemIndex(): InvoiceStatus {
    return null;
    // return this.tabs.indexOf(this.activeElement);
  }

  selectTab(activeElement: InvoiceStatus): void {
    this.activeElement = activeElement;
    this.fetchFilterByStatus();
  }

  fetch(): void {
    this.invoices$ = this.invoiceService.getAll$();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this.invoiceService.getAllStatus$();
  }

  fetchFilterByStatus(): void {
    this.invoices$ = this.invoiceService.getAll$().pipe(
      filter((invoices) => {
        return invoices.filter((x) => x.status._id === this.activeElement._id);
      })
    );
  }

  delete(item: Invoice): void {
    if (item) {
      this.invoiceService.delete$(item._id);
    }
  }

  downloadPdf(data: Invoice): void {
    this.templatePdfService.downloadPdf('invoice', data);
  }

  createBaseOnContract(invoice: Invoice): void {
    this.router.navigate([this.routing.admin.contract.create], {
      queryParams: {
        contractorId: invoice.contractor._id,
        // contractId: invoice._id,
      },
    });
  }

  createBaseOnAct(invoice: Invoice): void {}

  createBaseOnReference(invoice: Invoice): void {}
}
