import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.less']
})
export class ServicesCreateComponent implements OnInit, OnDestroy {
  private actionSaveSubject = new Subject<FormGroup>();
  private readonly destroySubject = new Subject();

  form = new FormGroup({
    _id: new FormControl(this.afs.createId(), []),
    _userId: new FormControl(null, []),
    count: new FormControl(0, [Validators.required]),
    desc: new FormControl(null, []),
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    tax: new FormControl(null, [Validators.required]),
    unit: new FormControl(0, [Validators.required]),
    group: new FormControl(null, [])
  });

  constructor(
    private afs: AngularFirestore,
    private servicesService: ServicesService,
    private route: Router
  ) {
    this.actionSaveSubject
      .pipe(
        filter((form: FormGroup) => form.valid),
        switchMap((form: FormGroup) => this.servicesService.add$(form.value)),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.actionSaveSubject.complete();
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  save(): void {
    this.actionSaveSubject.next(this.form);
  }

  cancel(): void {
    this.route.navigate([environment.routing.admin.settings.services.list]);
  }
}
