import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@ngrx/data';

import { Company, Contractor } from 'src/app/models/company.model';
import { CONTRACT_TEMPLATE_ALL } from 'src/app/templates/contracts/contract.template';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;

  private readonly destroy$ = new Subject();
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
  queryParams: QueryParams;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private contractorService: ContractorService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(filter((params) => params?.contractorId))
      .subscribe((params) => {
        this.queryParams = params;
      });

    this.initQueryParams();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  initForm(): void {
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

  initQueryParams(): void {
    if (this.queryParams?.contractorId) {
      this.contractorService
        .getById$(this.queryParams.contractorId.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe((contractor: Contractor[]) => {
          if (contractor.length) {
            this.form.controls.contractor.setValue(contractor[0]);
            // this.form.controls._contractId.setValue(
            //   this.queryParams?.contractorId
            // );
          }
        });
    }
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
    // TODO: NEED UPDATE INVOICE and set _contractId;
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
