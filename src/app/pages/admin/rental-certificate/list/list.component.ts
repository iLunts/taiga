import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

@Component({
  selector: 'app-rental-certificate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class RentalCertificateListComponent implements OnInit, OnDestroy {
  readonly columns = ['date', 'status', 'sum', 'action'];
  private readonly destroy$ = new Subject();
  rentalCertificates$: Observable<any>;
  rentalCertificateStatuses$: Observable<any>;
  rentalCertificateStatuses: RentalCertificateStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: RentalCertificateStatus;

  constructor(
    private rentalCertificateService: RentalCertificateService,
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
    return this.rentalCertificateStatuses.findIndex(
      (status: RentalCertificateStatus) => status._id === this.tabActive._id
    );
  }

  selectTab(activeElement: RentalCertificateStatus): void {
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
}
