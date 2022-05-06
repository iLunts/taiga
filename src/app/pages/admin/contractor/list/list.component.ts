import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ContractorListComponent implements OnInit {
  readonly columns = ['unp', 'name', 'action'];
  routing = environment.routing;
  isOpenAsideContractorView: boolean;
  private stateInProgressSubject = new BehaviorSubject<boolean>(false);
  stateInProgress$ = this.stateInProgressSubject.asObservable();

  constructor(private contractorService: ContractorService) {
    this.stateInProgress$.pipe(
      filter((data) => !!data),
      tap((data) => console.log('Data: ', data)),
      shareReplay()
    );
  }

  ngOnInit(): void {}

  toggleAsideContractorView(contractor: Company): void {
    this.isOpenAsideContractorView = !this.isOpenAsideContractorView;
    this.contractorService.setContractor(contractor);
  }

  // getTestSubject$(): Observable<boolean> {
  //   return this.stateInProgressSubject.asObservable();
  // }

  test(): void {
    this.stateInProgressSubject.next(true);

    setTimeout(() => {
      this.stateInProgressSubject.next(false);
    }, 5000);
  }
}
