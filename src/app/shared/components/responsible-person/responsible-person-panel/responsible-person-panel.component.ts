import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-responsible-person-panel',
  templateUrl: './responsible-person-panel.component.html',
  styleUrls: ['./responsible-person-panel.component.less']
})
export class ResponsiblePersonPanelComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  form: FormGroup;
  company: Company = new Company();

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
    this.initForm();

    this.companyService
      .getCompany$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company) => {
        this.company = company;
      });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.company.responsiblePerson = response;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl(null, [Validators.required]),
      basis: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    });
  }
}
