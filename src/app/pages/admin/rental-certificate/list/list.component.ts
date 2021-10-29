import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {
  RentalCertificate,
  RentalCertificateStatus,
} from 'src/app/models/rental-certificate';
import { RentalCertificateService } from 'src/app/services/rental-certificate-service.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';

@Component({
  selector: 'app-rental-certificate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class RentalCertificateListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
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
    return this.rentalCertificateStatuses.findIndex(
      (status: RentalCertificateStatus) => status._id === this.tabActive._id
    );
  }

  selectTab(activeElement: RentalCertificateStatus): void {
    this.tabActive = activeElement;
  }

  fetch(): void {
    this.rentalCertificates$ = this.rentalCertificateService.getAll$();
  }

  fetchStatuses(): void {
    this.rentalCertificateStatuses$ = this.rentalCertificateService
      .getAllStatus$()
      .pipe(
        tap((status: RentalCertificateStatus[]) => {
          this.rentalCertificateStatuses = status;
          this.tabActive = status?.length ? status[0] : null;
        }),
        takeUntil(this.destroy$)
      );
  }

  fetchFilterByStatus(): void {
    this.rentalCertificates$ = this.rentalCertificateService.getAll$().pipe(
      filter((rentalCetificates) => {
        return rentalCetificates.filter(
          (x) => x.status._id === this.tabActive._id
        );
      })
    );
  }

  delete(item: RentalCertificate): void {
    if (item) {
      this.rentalCertificateService.delete$(item._id);
    }
  }

  downloadPdf(data: RentalCertificate): void {
    this.templatePdfService.downloadPdf('invoice', data);
  }

  createBaseOnContract(rentalCertificate: RentalCertificate): void {
    this.router.navigate([this.routing.admin.contract.create], {
      queryParams: {
        contractorId: rentalCertificate.contractor._id,
      },
    });
  }

  createBaseOnAct(rentalCertificate: RentalCertificate): void {
    this.router.navigate([this.routing.admin.act.create], {
      queryParams: {
        invoiceId: rentalCertificate._id,
      },
    });
  }

  createBaseOnReference(rentalCertificate: RentalCertificate): void {}
}