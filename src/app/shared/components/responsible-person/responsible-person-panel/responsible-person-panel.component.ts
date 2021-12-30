import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Company, ResponsiblePerson } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-responsible-person-panel',
  templateUrl: './responsible-person-panel.component.html',
  styleUrls: ['./responsible-person-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiblePersonPanelComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<ResponsiblePerson>();

  private readonly destroy$ = new Subject();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: ResponsiblePerson) => {
        this.onChange.next(form);
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
