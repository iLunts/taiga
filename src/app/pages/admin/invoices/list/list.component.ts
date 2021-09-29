import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoicesListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
  private readonly destroy$ = new Subject();
  invoices$: Observable<any>;
  invoiceStatuses$: Observable<any>;
  invoiceStatuses: InvoiceStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  // readonly tabs = ['Все', 'Черновики', 'Оплаченные'];
  // activeElement = String(this.tabs[0]);
  tabActive: InvoiceStatus;

  constructor(
    private invoiceService: InvoiceService,
    private templatePdfService: TemplatePdfService,
    private router: Router
  ) {
    this.fetchStatuses();
    this.fetch();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get getTabActiveIndex(): number {
    return this.invoiceStatuses.findIndex(
      (status: InvoiceStatus) => status._id === this.tabActive._id
    );
  }

  selectTab(activeElement: InvoiceStatus): void {
    this.tabActive = activeElement;
    // this.fetchFilterByStatus();
  }

  fetch(): void {
    this.invoices$ = this.invoiceService.getAll$();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this.invoiceService.getAllStatus$().pipe(
      tap((status: InvoiceStatus[]) => {
        this.invoiceStatuses = status;
        this.tabActive = status?.length ? status[0] : null;
      }),
      takeUntil(this.destroy$)
    );
  }

  fetchFilterByStatus(): void {
    this.invoices$ = this.invoiceService.getAll$().pipe(
      filter((invoices) => {
        return invoices.filter((x) => x.status._id === this.tabActive._id);
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

  createBaseOnAct(invoice: Invoice): void {
    this.router.navigate([this.routing.admin.act.create], {
      queryParams: {
        invoiceId: invoice._id,
      },
    });
  }

  createBaseOnReference(invoice: Invoice): void {}
}
