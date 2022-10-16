import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import * as _ from 'lodash';

import { Act, ActStatus } from 'src/app/models/act.model';
import { ActService } from 'src/app/services/act.service';
import { StoreService } from 'src/app/services/store.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Status } from 'src/app/models/status.model';
import { StatusHelper } from 'src/app/utils/status.helper';

@Component({
  selector: 'app-act-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ActListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'date', 'status', 'sum', 'action'];
  actStatuses: ActStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: ActStatus;
  selectedAct: Act;
  lastIndex$: Observable<Act>;

  private readonly destroy$ = new Subject();
  acts$: Observable<any>;
  actStatuses$: Observable<any>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  constructor(
    private actService: ActService,
    private templatePdfService: TemplatePdfService,
    private storeService: StoreService,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.fetch();

    this.lastIndex$ = this.acts$.pipe(
      filter((acts) => !!acts),
      map((acts) => _.maxBy(acts, (c) => c.number))
    );
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

  openDeleteModal(
    item: Act,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.selectedAct = item;
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

  delete(item: Act): void {
    if (item) {
      this.actService.delete$(item._id);
    }
  }

  downloadPdf(act: Act): void {
    // TODO: Need create template for ACT
    this.templatePdfService.downloadPdf('act', act);
  }

  createBaseOnReference(act: Act): void {}

  getStatusClass(status: Status): string {
    return StatusHelper.getStatusClassName(status);
  }
}
