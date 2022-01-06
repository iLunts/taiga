import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less'],
  providers: [TuiDestroyService]
})
export class ServiceTableComponent implements OnInit {
  @Input() set services(services: Service[]) {
    this.servicesSubject.next(services);
    // if (services?.length) {
    //   this.preloadServices(services);
    // }
  }
  // get services(): Service[] {
  //   return this._services;
  // }
  // private _services: Service[];
  private servicesSubject = new BehaviorSubject<Service[]>(null);

  @Output() selected = new EventEmitter<Service[]>();

  form: FormGroup;
  columns: ['name', 'date', 'w', 'price'];
  serviceListData$: Observable<Service[]>;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService,
    private destroy: TuiDestroyService
  ) {
    this.createForm();
    this.fetch();

    this.servicesSubject
      .pipe(
        filter((services) => !!services),
        distinctUntilChanged(),
        tap((services) => {
          // services.forEach((element) => {
          //   this.addNewRow();
          // });
          // this.form.controls.tableRowArray.patchValue(services);
        })
      )
      .subscribe();

    // this.form.valueChanges
    //   .pipe(
    //     // distinctUntilChanged((a, b) => _.isEqual(a, b)),
    //     tap((data) => {
    //       debugger;
    //     }),
    //     takeUntil(this.destroy)
    //   )
    //   .subscribe(() => {
    //     this.sortTableByDate();
    //     debugger;
    //     this.doEmit();
    //   });
  }

  ngOnInit(): void {}

  fetch(): void {
    this.serviceListData$ = this.serviceService.getAll$();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([this.createTableRow()])
    });

    // this.onChanges();
  }

  private clearForm(): void {
    this.form = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([this.createTableRow()])
    });
  }

  private createTableRow(serviceItem?: Service): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(serviceItem?.name || null, {
        validators: [Validators.required]
      }),
      date: new FormControl(this.initDate(), {
        validators: [Validators.required]
      }),
      count: new FormGroup({
        amount: new FormControl(serviceItem?.count.amount || null, {
          validators: [Validators.required]
        }),
        isEditable: new FormControl(serviceItem?.count.isEditable, {
          validators: [Validators.required]
        })
      }),
      price: new FormGroup({
        amount: new FormControl(null, {
          validators: [Validators.required]
        }),
        currency: new FormControl(serviceItem?.price.currency, {
          validators: [Validators.required]
        })
      }),
      unit: new FormGroup({
        _id: new FormControl(serviceItem?.unit._id, {
          validators: [Validators.required]
        }),
        fullName: new FormControl(serviceItem?.unit.fullName, {
          validators: [Validators.required]
        }),
        shortName: new FormControl(serviceItem?.unit.shortName, {
          validators: [Validators.required]
        })
      }),
      totalSum: new FormGroup({
        amount: new FormControl(null, {
          validators: [Validators.required]
        }),
        currency: new FormControl(null, {
          validators: [Validators.required]
        })
      }),
      tax: new FormGroup({
        _id: new FormControl(null, {
          validators: [Validators.required]
        }),
        amount: new FormControl(null, {
          validators: [Validators.required]
        }),
        desc: new FormControl(null),
        isCalculate: new FormControl(null, {
          validators: [Validators.required]
        }),
        label: new FormControl(null, {
          validators: [Validators.required]
        })
      }),
      totalTax: new FormGroup({
        amount: new FormControl(null, {
          validators: [Validators.required]
        }),
        currency: new FormControl(null, {
          validators: [Validators.required]
        })
      })
    });
  }

  get tableRowArray(): FormArray {
    return this.form.get('tableRowArray') as FormArray;
  }

  addNewRow(serviceItem?: Service): void {
    this.tableRowArray.push(this.createTableRow(serviceItem));
  }

  deleteRow(rowIndex: number): void {
    this.tableRowArray.removeAt(rowIndex);
  }

  initDate(): any {
    let format = 'DD.MM.YYYY';
    if (this.form) {
      let lastIndex = this.form.get('tableRowArray')['controls'].length - 1;
      let date =
        this.form.get('tableRowArray')['controls'][lastIndex].controls.date
          .value;
      return TuiDay.normalizeParse(moment(date).add(1, 'day').format(format));
    } else {
      return TuiDay.normalizeParse(moment().format(format));
    }
  }

  getFormArray(index: number): FormArray {
    return this.form.get('tableRowArray')['controls'][index].controls;
  }

  selectedService(event: Service, index: number): void {
    const control = this.form.get('tableRowArray')['controls'][index].controls;

    // Count
    control.count.setValue(event.count);

    // Price
    control.price.setValue(event.price);

    // Unit
    control.unit.setValue(event.unit);

    // Tax
    control.tax.setValue(event.tax);

    // Total
    control.totalSum.controls.amount.setValue(
      event.price.amount * event.count.amount
    );
    control.totalSum.controls.currency.setValue(event.price.currency);

    // TotalTax
    control.totalTax.controls.currency.setValue(event.price.currency);

    // Calculate
    this.calculate(index);
  }

  calculateSum(event: any, index: number): void {
    const control = this.form.get('tableRowArray')['controls'][index].controls;

    control.totalSum.controls.amount.patchValue(
      (
        event.controls.count.controls.amount.value *
        event.controls.price.controls.amount.value
      ).toFixed(2)
    );

    control.totalTax.controls.amount.patchValue(
      (
        event.controls.count.controls.amount.value *
        event.controls.price.controls.amount.value *
        event.controls.tax.controls.amount.value
      ).toFixed(2)
    );

    this.doEmit();
  }

  calculate(index: number): void {
    const control = this.form.get('tableRowArray')['controls'][index].controls;

    control.totalSum.controls.amount.patchValue(
      (control.count.value.amount * control.price.value.amount).toFixed(2)
    );

    control.totalTax.controls.amount.patchValue(
      (
        control.count.value.amount *
        control.price.value.amount *
        control.tax.value.amount
      ).toFixed(2)
    );

    console.log('calculate: ', this.form.value);
    this.doEmit();
  }

  getRowArrayValue(): any {
    return this.form.get('tableRowArray').value;
  }

  doEmit(): void {
    if (this.form.valid) {
      this.selected.emit(this.form.get('tableRowArray').value);
    } else {
      this.selected.emit([]);
    }
  }

  // onChanges(): void {
  //   this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
  //     this.sortTableByDate();
  //     debugger;
  //     this.doEmit();
  //   });
  // }

  preloadServices(services: Service[]): void {
    // this.tableRowArray.patchValue(services);
    // this.tableRowArray.setValue(services);
  }

  sortTableByDate(): void {
    // const minDate = _.minBy(this.getRowArrayValue(), (service: any) => {
    //   return  moment(service.date, 'YYYY-MM-DD').toDate();
    // });
    // console.log('Sort min: ', minDate);
  }
}
