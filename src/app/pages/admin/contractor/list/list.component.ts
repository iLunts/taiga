import { Component, OnInit } from '@angular/core';

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

  constructor(private contractorService: ContractorService) {}

  ngOnInit(): void {}

  toggleAsideContractorView(contractor: Company): void {
    this.isOpenAsideContractorView = !this.isOpenAsideContractorView;
    this.contractorService.setContractor(contractor);
  }
}
