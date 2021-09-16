import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { EgrService } from 'src/app/services/egr.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  form: FormGroup;
  contractor: Contractor = new Contractor();

  isValidCompany: boolean;
  isValidBank: boolean;
  isValid: boolean;
  isBankSelected: boolean;
  isCompanySelected: boolean;
  isLoading = false;

  constructor(
    private afs: AngularFirestore,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private egrService: EgrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setupForm();

    this.companyService.getCompanyState$().subscribe((contractor: Company) => {
      console.log('Company State$: ', contractor);
      this.contractor = contractor;
      this.checkValid();
    });
  }

  setupForm(): void {
    this.form = this.formBuilder.group({
      unp: new FormControl(null, [Validators.required]),
      bic: new FormControl(null, [Validators.required]),
      // samePostMail: new FormControl(false),
    });
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

  checkValid(): void {
    this.isValidCompany = this.companyService.isCompanyInfoValid(
      this.contractor
    );
    this.isValidBank = this.companyService.isCompanyBankValid(this.contractor);
    this.isValid = this.companyService.isCompanyValid(this.contractor);
  }
}
