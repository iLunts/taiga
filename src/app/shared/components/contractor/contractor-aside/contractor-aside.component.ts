import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-contractor-aside',
  templateUrl: './contractor-aside.component.html',
  styleUrls: ['./contractor-aside.component.less']
})
export class ContractorAsideComponent implements OnInit {
  searchControl = new FormControl(null);
  contractors$: Observable<Contractor[]>;
  contractorSelected$: Observable<Contractor>;
  selectedContractor: Contractor;

  constructor(
    private contractorService: ContractorService,
    private storeService: StoreService
  ) {
    this.contractors$ = this.contractorService.getAll$();
    this.storeService
      .getContractor$()
      .pipe(
        filter((contractor) => !!contractor),
        tap((contractor) => this.setContractor(contractor)),
        shareReplay()
      )
      .subscribe();
  }

  ngOnInit(): void {}

  selectContractor(contractor: Contractor): void {
    this.storeService.setContractor(contractor);
  }

  setContractor(contractor: Contractor): void {
    this.selectedContractor = contractor;
  }

  isSelectedContractor(contractor: Contractor): boolean {
    return this.selectedContractor?._id === contractor?._id;
  }
}
