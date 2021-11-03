import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class ContractorCreateComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  contractor: Contractor = new Contractor();
  isValid: boolean;
  isLoading = false;

  constructor(
    private companyService: CompanyService,
    private contractorService: ContractorService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyState$().subscribe((contractor: Company) => {
      this.contractor = contractor;
      this.checkValid();
    });
  }

  checkValid(): void {
    this.isValid = this.companyService.isCompanyValid(this.contractor);
  }

  save(): void {
    this.isLoading = true;
    this.contractorService.add$(this.contractor).subscribe(() => {
      this.isLoading = false;
      this.cancel();
    });
  }

  cancel(): void {
    this.companyService.clearCompany();
    this.close.emit(true);
  }
}
