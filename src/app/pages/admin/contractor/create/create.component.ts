import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Bank } from 'src/app/models/bank.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { BankService } from 'src/app/services/bank.service';
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

  readonly maskUNP = {
    guide: false,
    modelClean: true,
    mask: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private contractorService: ContractorService,
    private companyService: CompanyService,
    private egrService: EgrService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    // this.form.valueChanges.subscribe((obj) => {
    //   obj.info.unp = obj.info.unp.replace(/\D+/g, '');
    // });

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
      samePostMail: new FormControl(false),
    });
  }

  save(): void {
    this.contractorService.add$(this.contractor).subscribe(() => {
      this.cancel();
    });
  }

  cancel(): void {
    this.companyService.clearCompany();
    this.close.emit(true);
  }

  getContractorInformation(): void {
    if (this.form.controls.unp.value) {
      this.egrService.getAllByUnp(
        this.form.controls.unp.value.replace(/ /g, '')
      );
    }
  }

  changeCompany(): void {
    this.companyService.clearCompanyInfo();
    this.form.controls.unp.setValue(null);
    this.checkValid();
  }

  changeBank(bankInfo: Bank): void {
    if (this.contractor && bankInfo && bankInfo.CDBank) {
      this.contractor.bankAccount.bank = bankInfo;
    } else {
      this.companyService.clearCompanyBank();
    }

    this.companyService.setCompany(this.contractor);
    this.checkValid();
  }

  changePostAddress(): void {
    if (this.form.controls.samePostMail.value) {
      this.contractor.mailingAddress = this.contractor.juridicalAddress;
      this.companyService.setCompany(this.contractor);
    } else {
      this.companyService.clearMailingAddress();
    }
  }

  checkValid(): void {
    this.isValidCompany = this.companyService.isCompanyInfoValid(
      this.contractor
    );
    this.isValidBank = this.companyService.isCompanyBankValid(this.contractor);
    this.isValid = this.companyService.isCompanyValid(this.contractor);

    if (this.isValidCompany) {
      this.form.controls.samePostMail.enable();
    } else {
      this.form.controls.samePostMail.disable();
    }
  }
}
