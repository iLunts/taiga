import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import * as _ from 'lodash';

import { Invoice, InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TabItem } from 'src/app/models/tabs.model';
import { Status } from 'src/app/models/status.model';
import { StatusHelper } from 'src/app/utils/status.helper';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class InvoicesListComponent implements OnInit, OnDestroy {
  readonly routing = environment.routing;
  readonly columns = ['number', 'date', 'status', 'price', 'action'];
  invoiceStatuses: InvoiceStatus[] = [];
  isLoaded: boolean;
  selectedInvoice: Invoice;
  tabs: TabItem[] = [
    {
      name: 'Все',
      disabled: false
    },
    {
      name: 'Оплаченные',
      disabled: true
    },
    {
      name: 'Просроченные',
      disabled: true
    }
  ];
  tabActive: TabItem = this.tabs[0];

  private readonly destroySubject = new Subject();
  invoices$: Observable<any>;
  invoiceStatuses$: Observable<any>;
  lastIndex$: Observable<Invoice>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  constructor(
    private invoiceService: InvoiceService,
    private templatePdfService: TemplatePdfService,
    private storeService: StoreService,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.fetch();

    this.lastIndex$ = this.invoices$.pipe(
      filter((contracts) => !!contracts),
      map((contracts) => _.maxBy(contracts, (c) => c.number))
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  get getTabActiveIndex(): number {
    // return this.invoiceStatuses.findIndex(
    //   (status: InvoiceStatus) => status._id === this.tabActive._id
    // );
    return this.tabs.findIndex((item: TabItem) => item === this.tabActive);
  }

  selectTab(activeElement: TabItem): void {
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

  openDeleteModal(
    item: Invoice,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.selectedInvoice = item;
    this.dialogService
      .open(content, {
        label: 'Удаление',
        size: 'm',
        required: false,
        data: item
      })
      .pipe(indicate(this.indicator$))
      .subscribe({
        next: (data) => {
          this.delete(item);
        },
        complete: () => {}
      });
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

  createBaseOnReference(invoice: Invoice): void {
    this.router.navigate([this.routing.admin.rentalCertificate.create], {
      queryParams: {
        invoiceId: invoice._id
      }
    });
  }

  edit(invoice: Invoice): void {
    this.router.navigate([this.routing.admin.invoice.edit, invoice._id]);
  }

  getStatusClass(status: Status): string {
    return StatusHelper.getStatusClassName(status);
  }
}
