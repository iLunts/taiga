import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { Act, ActStatus } from 'src/app/models/act.model';
import { ActService } from 'src/app/services/act.service';
import { StoreService } from 'src/app/services/store.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-act-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ActListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
  private readonly destroy$ = new Subject();
  acts$: Observable<any>;
  actStatuses$: Observable<any>;
  actStatuses: ActStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: ActStatus;

  constructor(
    private actService: ActService,
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
    return this.actStatuses.findIndex(
      (status: ActStatus) => status._id === this.tabActive._id
    );
  }

  selectTab(status: ActStatus): void {
    this.tabActive = status;
  }

  fetch(): void {
    this.acts$ = this.storeService.getContractor$().pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged(),
      switchMap((contractor) =>
        this.actService.getAllByContractorId$(contractor._id)
      ),
      shareReplay()
    );
  }

  fetchFilterByStatus(): void {
    this.acts$ = this.actService.getAll$().pipe(
      filter((invoices) => {
        return invoices.filter((x) => x.status._id === this.tabActive._id);
      })
    );
  }

  delete(item: Act): void {
    if (item) {
      this.actService.delete$(item._id);
    }
  }

  downloadPdf(act: Act): void {
    // TODO: Need create template for ACT
    this.templatePdfService.downloadPdf('act', act);
  }

  createBaseOnContract(invoice: Act): void {
    this.router.navigate([this.routing.admin.contract.create], {
      queryParams: {
        contractorId: invoice.contractor._id
        // contractId: invoice._id,
      }
    });
  }

  createBaseOnAct(act: Act): void {}

  createBaseOnReference(act: Act): void {}
}
