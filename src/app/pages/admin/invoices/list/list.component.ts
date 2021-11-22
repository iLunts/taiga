import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class InvoicesListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'date', 'status', 'price', 'action'];
  private readonly destroy$ = new Subject();
  invoices$: Observable<any>;
  invoiceStatuses$: Observable<any>;
  invoiceStatuses: InvoiceStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: InvoiceStatus;

  constructor(
    private invoiceService: InvoiceService,
    private templatePdfService: TemplatePdfService,
    private storeService: StoreService,
    private router: Router
  ) {
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
    this.invoices$ = this.storeService.getContractor$().pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged(),
      switchMap((contractor) =>
        this.invoiceService.getAllByContractorId$(contractor._id)
      ),
      shareReplay()
    );
  }

  // fetchFilterByStatus(): void {
  //   this.invoices$ = this.invoiceService.getAll$().pipe(
  //     filter((invoices) => {
  //       return invoices.filter((x) => x.status._id === this.tabActive._id);
  //     })
  //   );
  // }

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
        contractorId: invoice.contractor._id
        // contractId: invoice._id,
      }
    });
  }

  createBaseOnAct(invoice: Invoice): void {
    this.router.navigate([this.routing.admin.act.create], {
      queryParams: {
        invoiceId: invoice._id
      }
    });
  }

  createBaseOnReference(invoice: Invoice): void {}
}
