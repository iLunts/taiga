import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceGroup } from 'src/app/models/service.model';
import { ServicesGroupService } from 'src/app/services/services-group.service';
import { Tax } from 'src/app/models/tax.model';
import { TaxService } from 'src/app/services/tax.service';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';

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
  newGroupVisible: boolean;

  form: FormGroup;
  formGroup: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private servicesService: ServicesService,
    private servicesGroupService: ServicesGroupService,
    private taxService: TaxService,
    private unitService: UnitService,
    private route: Router
  ) {
    this.initForm();
    this.initFormGroup();

    this.actionSaveSubject
      .pipe(
        filter((form: FormGroup) => form.valid),
        switchMap((form: FormGroup) => this.servicesService.add$(form.value)),
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
      price: new FormControl(0, [Validators.required]),
      tax: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
      group: new FormControl(null, []),
      count: new FormGroup({
        amount: new FormControl(1, [Validators.required]),
        isEditable: new FormControl(true)
      })
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

  save(): void {
    this.actionSaveSubject.next(this.form);
  }

  cancel(): void {
    this.route.navigate([environment.routing.admin.settings.services.list]);
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
