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
import {
  defaultEditorExtensions,
  tiptapEditorStyles,
  TUI_EDITOR_EXTENSIONS,
  TUI_EDITOR_STYLES,
} from '@taiga-ui/addon-editor';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CONTRACT_TEMPLATE_ALL } from 'src/app/templates/contracts/contract.template';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
    {
      provide: TUI_EDITOR_STYLES,
      useValue: tiptapEditorStyles,
    },
  ],
})
export class ContractCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;

  private readonly destroySubject = new Subject();
  templateContent = CONTRACT_TEMPLATE_ALL;
  form: FormGroup;
  queryParams: QueryParams;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private contractorService: ContractorService,
    private companyService: CompanyService
  ) {
    this.initForm();

    this.route.queryParams
      .pipe(filter((params) => params?.contractorId))
      .subscribe((params) => {
        this.queryParams = params;
      });

    this.initQueryParams();

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((company: Company[]) => {
        if (company?.length) {
          this.form.controls.profileCompany.setValue(company[0]);
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      date: new FormControl(DateHelper.initDate(), [Validators.required]),
      contractor: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      number: new FormControl(1, [Validators.required]),
      profileCompany: new FormControl(null, [Validators.required]),
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
        .pipe(takeUntil(this.destroySubject))
        .subscribe((contractor: Contractor[]) => {
          if (contractor.length) {
            this.form.controls.contractor.setValue(contractor[0]);
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
