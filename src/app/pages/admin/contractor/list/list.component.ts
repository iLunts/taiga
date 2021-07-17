import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractorListComponent implements OnInit {
  readonly columns = ['unp', 'name', 'action'];
  routing = environment.routing;
  contractors$: Observable<Contractor[]>;
  isOpenAsideContractorCreate: boolean;

  constructor(private contractorService: ContractorService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.contractors$ = this.contractorService.getAll$();
  }

  delete(item: Contractor): void {
    if (item) {
      this.contractorService.delete$(item._id);
    }
  }

  toggleAsideContractorCreate(): void {
    this.isOpenAsideContractorCreate = !this.isOpenAsideContractorCreate;
  }
}
