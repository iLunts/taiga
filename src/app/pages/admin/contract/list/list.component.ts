import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Contract, ContractStatus } from 'src/app/models/contract.model';
import { Invoice } from 'src/app/models/invoice.model';
import { ContractService } from 'src/app/services/contract.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'unp', 'status', 'action'];
  private readonly destroy$ = new Subject();
  contracts$: Observable<Contract[]>;
  contractStatuses$: Observable<ContractStatus[]>;
  contractStatuses: ContractStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: ContractStatus;

  constructor(
    private contractService: ContractService,
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
    return this.contractStatuses.findIndex(
      (status: ContractStatus) => status._id === this.tabActive._id
    );
  }

  selectTab(status: ContractStatus): void {
    this.tabActive = status;
  }

  fetch(): void {
    this.contracts$ = this.contractService.getAll$();
  }

  fetchStatuses(): void {
    this.contractStatuses$ = this.contractService.getAllStatus$().pipe(
      tap((status: ContractStatus[]) => {
        this.contractStatuses = status;
        this.tabActive = status?.length ? status[0] : null;
      }),
      takeUntil(this.destroy$)
    );
  }

  delete(item: Invoice): void {
    if (item) {
      this.contractService.delete$(item._id);
    }
  }

  downloadPdf(data: Contract): void {
    this.templatePdfService.downloadPdf('contract', data);
  }

  createBaseOnInvoice(contract: Contract): void {
    this.router.navigate([this.routing.admin.invoice.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id,
      },
    });
  }

  createBaseOnAct(data): void {}

  createBaseOnReference(data): void {}
}
