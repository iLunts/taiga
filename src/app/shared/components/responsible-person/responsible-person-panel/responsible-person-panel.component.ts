import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-responsible-person-panel',
  templateUrl: './responsible-person-panel.component.html',
  styleUrls: ['./responsible-person-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiblePersonPanelComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);

  @Output() onChange = new EventEmitter<Company>();

  private readonly destroySubject = new Subject();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();

    this.companySubject
      .pipe(
        filter((company: Company) => !!company),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) =>
        this.form.patchValue(company.responsiblePerson)
      );

    combineLatest([this.companySubject.pipe(), this.form.valueChanges])
      .pipe(
        debounceTime(400),
        map(([company, form]) => ({
          ...company,
          responsiblePerson: form
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((company: Company) => {
        this.onChange.next(company);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.companySubject.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      basis: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      type: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    });
  }
}
