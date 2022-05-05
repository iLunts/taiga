import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import * as _ from 'lodash';

import { Contract, ContractStatus } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { StoreService } from 'src/app/services/store.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractListComponent implements OnInit, OnDestroy {
  readonly columns = ['number', 'date', 'status', 'dateCreation', 'action'];
  contractStatuses: ContractStatus[] = [];
  isLoaded: boolean;
  routing = environment.routing;
  tabActive: ContractStatus;
  selectedContract: Contract;

  private readonly destroy$ = new Subject();
  contracts$: Observable<Contract[]>;
  contractStatuses$: Observable<ContractStatus[]>;
  lastIndex$: Observable<Contract>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  constructor(
    private contractService: ContractService,
    private templatePdfService: TemplatePdfService,
    private router: Router,
    private storeService: StoreService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.fetch();

    this.lastIndex$ = this.contracts$.pipe(
      filter((contracts) => !!contracts),
      map((contracts) => _.maxBy(contracts, (c) => c.number))
    );
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
    this.contracts$ = this.storeService.getContractor$().pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged(),
      switchMap((contractor) =>
        this.contractService.getAllByContractorId$(contractor._id)
      ),
      shareReplay()
    );
  }

  openDeleteModal(
    item: Contract,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.selectedContract = item;
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

  delete(item: Contract): void {
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
        contractId: contract._id
      }
    });
  }

  createBaseOnAct(contract: Contract): void {
    this.router.navigate([this.routing.admin.act.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id
      }
    });
  }

  createBaseOnRentalReference(contract: Contract): void {
    this.router.navigate([this.routing.admin.rentalCertificate.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id
      }
    });
  }
}
