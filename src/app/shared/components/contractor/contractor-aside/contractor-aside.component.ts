import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  tap
} from 'rxjs/operators';

import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-aside',
  templateUrl: './contractor-aside.component.html',
  styleUrls: ['./contractor-aside.component.less']
})
export class ContractorAsideComponent implements OnInit {
  filterControl = new FormControl('');
  selectedContractor: Contractor;
  routing = environment.routing;

  filter$: Observable<string>;
  contractors$: Observable<Contractor[]>;
  filteredContractors$: Observable<Contractor[]>;
  contractorSelected$: Observable<Contractor>;

  constructor(
    private contractorService: ContractorService,
    private storeService: StoreService,
    private router: Router
  ) {
    this.contractors$ = this.contractorService.getAll$().pipe(
      filter((contractors) => !!contractors),
      distinctUntilChanged(),
      tap((contractors) => this.selectContractor(contractors[0]))
    );

    this.filteredContractors$ = combineLatest([
      this.contractors$,
      this.filterControl.valueChanges.pipe(startWith(''), debounceTime(400))
    ]).pipe(
      distinctUntilChanged(),
      filter(([contractors, search]) => Boolean(contractors)),
      map(([contractors, search]) => {
        return contractors.filter(
          (contractor: Contractor) =>
            contractor.info.fullName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            contractor.info.unp.toLowerCase().includes(search.toLowerCase())
        );
      })
    );

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

  goToCreatePage(): void {
    this.router.navigate([this.routing.admin.contractor.create]);
  }
}
