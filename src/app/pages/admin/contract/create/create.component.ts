import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';

import { ContractService } from 'src/app/services/contract.service';
import { CONTRACT_TEMPLATE_ALL } from 'src/app/templates/contracts/contract.template';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractCreateComponent implements OnInit {
  @ViewChild('qrBlock') qrBlock: any;
  editorOptions = {
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'insertImage',
      'insertLink',
      'insertTable',
      'undo',
      'redo',
    ],
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
  templateContent = CONTRACT_TEMPLATE_ALL;

  // contract: Contract = new Contract(this.afs.createId());
  form: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      date: new FormControl(DateHelper.initDate(), [Validators.required]),
      contractor: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profile: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null, [Validators.required]),
      signature: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      type: new FormControl(1, [Validators.required]),
      template: new FormControl(this.templateContent, [Validators.required]),
    });
  }

  get isContractValid(): boolean {
    return true;
  }

  get isQrCodeValid(): boolean {
    return (
      this.qrBlock && this.qrBlock.qrcElement.nativeElement.childNodes.length
    );
  }

  get getQrCode(): void {
    if (this.isQrCodeValid) {
      return this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    } else {
      return null;
    }
  }

  setStatus(data: any): void {
    if (this.form) {
      this.form.controls.status.setValue(data);
    }
  }

  setContractor(data: Company): void {
    if (this.form) {
      this.form.controls.contractor.setValue(data);
    }
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.controls.qrCode.setValue(this.getQrCode);
    }

    this.contractService.add$(this.form.value).subscribe((response) => {
      this.router.navigate([environment.routing.admin.contract.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.contract.list]);
  }
}
