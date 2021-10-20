import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Contract } from 'src/app/models/contract.model';
import { Contractor } from 'src/app/models/contractor.model';
import { ContractService } from 'src/app/services/contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-panel',
  templateUrl: './contract-panel.component.html',
  styleUrls: ['./contract-panel.component.less'],
})
export class ContractPanelComponent implements OnInit, OnDestroy {
  @Input() set contractor(value: Contractor) {
    if (value) {
      this._contractor = value;
      this.fetch();
    }
  }
  get contractor(): Contractor {
    return this._contractor;
  }
  private _contractor: Contractor;

  @Output() selected = new EventEmitter<Contract>();

  private readonly destroy$ = new Subject();
  contracts$: Observable<Contract[]>;
  form = new FormGroup({
    contract: new FormControl(null, [Validators.required]),
  });
  routing = environment.routing;

  readonly contract = new FormControl(null);

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  fetch(): void {
    this.contracts$ = this.contractService
      .getAllByContractorUNP$(this.contractor.info.unp)
      .pipe(
        tap((contracts: Contract[]) => {
          if (contracts?.length) {
            this.selected.emit(contracts[0]);
            this.form.controls.contract.setValue(contracts[0]);
          }
        }),
        takeUntil(this.destroy$)
      );
  }

  openContractCreatePage(): void {
    // TODO: Need add queryParams with selected contractor
    this.router.navigateByUrl(this.routing.admin.contract.create);
  }
}
