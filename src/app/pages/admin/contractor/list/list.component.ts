import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
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
  contractors$: Observable<Contractor[]>;
  isOpenAsideContractorView: boolean;

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

  toggleAsideContractorView(contractor: Company): void {
    this.isOpenAsideContractorView = !this.isOpenAsideContractorView;
    this.contractorService.setContractor(contractor);
  }
}
