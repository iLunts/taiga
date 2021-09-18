import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less'],
})
export class ContractorInfoComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<boolean>();

  private readonly destroy$ = new Subject();
  contractor: Contractor = new Contractor();

  constructor(private contractorService: ContractorService) {
    this.contractorService
      .getContractorState$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((contractor: Contractor) => {
        this.contractor = contractor;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  cancel(): void {
    this.contractorService.clearContractor();
    this.close.emit(true);
  }

  get isJuridicalAndMailingAddressSame(): boolean {
    return this.contractorService.isJuridicalAndMailingAddressSame(
      this.contractor
    );
  }

  getAddressToString(type: 'juridical' | 'mailing'): string {
    return this.contractorService.getAddressToString(this.contractor, type);
  }

  getBankInfoToString(): string {
    return this.contractorService.getBankInfoToString(this.contractor);
  }
}
