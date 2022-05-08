import { AngularFirestore } from '@angular/fire/firestore';
import { iif, Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Service, ServiceGroup } from 'src/app/models/service.model';
import { ServicesGroupService } from 'src/app/services/services-group.service';
import { Tax } from 'src/app/models/tax.model';
import { TaxService } from 'src/app/services/tax.service';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/models/price.model';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.less']
})
export class ServicesCreateComponent implements OnInit, OnDestroy {
  private actionSaveSubject = new Subject<FormGroup>();
  private actionNewGroupSubject = new Subject<FormGroup>();
  private readonly destroySubject = new Subject();
  group$: Observable<ServiceGroup[]>;
  tax$: Observable<Tax[]>;
  unit$: Observable<Unit[]>;
  currency$: Observable<Currency[]>;
  newGroupVisible: boolean;
  isEdit: boolean;
  form: FormGroup;
  formGroup: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private servicesService: ServicesService,
    private servicesGroupService: ServicesGroupService,
    private taxService: TaxService,
    private unitService: UnitService,
    private currencyService: CurrencyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
    this.initFormGroup();

    this.route.paramMap
      .pipe(
        map((params: any) => params.params),
        filter((params) => params.id),
        switchMap((params) => this.servicesService.getById$(params.id)),
        filter((service) => !!service),
        takeUntil(this.destroySubject)
      )
      .subscribe((service) => {
        this.setForm(service);
        this.isEdit = true;
      });

    // TODO: Need check why called two Observables when we editing data
    this.actionSaveSubject
      .pipe(
        filter((form: FormGroup) => form.valid),
        switchMap((form: FormGroup) =>
          iif(
            () => !!this.isEdit,
            this.servicesService.update$(form.value._id, form.value),
            this.servicesService.add$(form.value)
          )
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe();

    this.actionNewGroupSubject
      .pipe(
        filter((form: FormGroup) => form.valid),
        switchMap((form: FormGroup) =>
          this.servicesGroupService.add$(form.value)
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe(() => this.toggleNewGroup());

    this.group$ = this.servicesGroupService.getAll$();
    this.tax$ = this.taxService.getAll$();
    this.unit$ = this.unitService.getAll$();
    this.currency$ = this.currencyService.getAll$();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.actionSaveSubject.complete();
    this.actionNewGroupSubject.complete();
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = new FormGroup({
      _id: new FormControl(this.afs.createId(), []),
      _userId: new FormControl(null, []),
      desc: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      price: new FormGroup({
        amount: new FormControl(0, [Validators.required]),
        currency: new FormControl(null, [Validators.required])
      }),
      tax: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
      group: new FormControl(null, []),
      count: new FormGroup({
        amount: new FormControl(1, [Validators.required]),
        isEditable: new FormControl(true)
      }),
      isFreePrice: new FormControl(false)
    });
  }

  initFormGroup(): void {
    this.formGroup = new FormGroup({
      _id: new FormControl(this.afs.createId(), []),
      _userId: new FormControl(null, []),
      desc: new FormControl(null, []),
      name: new FormControl(null, [Validators.required])
    });
  }

  setForm(service: Service): void {
    this.form.setValue(service);
  }

  save(): void {
    this.actionSaveSubject.next(this.form);
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.settings.services.list]);
  }

  toggleNewGroup(): void {
    this.newGroupVisible = !this.newGroupVisible;
    this.initFormGroup();
  }

  createNewGroup(): void {
    this.actionNewGroupSubject.next(this.formGroup);
  }

  setGroup(group): void {
    this.form.controls.group.patchValue({ ...group });
  }
}
