import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

import {
  RentalCertificate,
  RentalCertificateStatus
} from 'src/app/models/rental-certificate.model';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { StoreService } from 'src/app/services/store.service';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { Status } from 'src/app/models/status.model';
import { StatusHelper } from 'src/app/utils/status.helper';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TabItem } from 'src/app/models/tabs.model';

@Component({
  selector: 'app-rental-certificate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class RentalCertificateListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private readonly destroy$ = new Subject();
  rentalCertificates$: Observable<any>;
  rentalCertificateStatuses$: Observable<any>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  readonly columns = ['date', 'status', 'sum', 'action'];
  rentalCertificateStatuses: RentalCertificateStatus[] = [];
  selectedRentalCertificate: RentalCertificate;
  isLoaded: boolean;
  isViewInit: boolean;
  routing = environment.routing;

  tabs: TabItem[] = [
    {
      name: 'Все',
      disabled: false
    },
    {
      name: 'Отправленные',
      disabled: true
    },
    {
      name: 'Подписанные',
      disabled: true
    }
  ];
  tabActive: TabItem = this.tabs[0];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private rentalCertificateService: RentalCertificateService,
    private templatePdfService: TemplatePdfService,
    private storeService: StoreService
  ) {
    this.fetch();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isViewInit = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get getTabActiveIndex(): number {
    return this.tabs.findIndex((item: TabItem) => item === this.tabActive);
  }

  selectTab(activeElement: TabItem): void {
    this.tabActive = activeElement;
  }

  fetch(): void {
    this.rentalCertificates$ = this.storeService.getContractor$().pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged(),
      switchMap((contractor) =>
        this.rentalCertificateService.getAllByContractorId$(contractor._id)
      ),
      shareReplay()
    );
  }

  delete(item: RentalCertificate): void {
    if (item) {
      this.rentalCertificateService.delete$(item._id);
    }
  }

  downloadPdf(data: RentalCertificate): void {
    this.templatePdfService.downloadPdf('rental-certificate', data);
  }

  getStatusClass(status: Status): string {
    return StatusHelper.getStatusClassName(status);
  }

  openDeleteModal(
    item: RentalCertificate,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.selectedRentalCertificate = item;
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
}
