import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { TUI_ARROW } from '@taiga-ui/kit';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/service.model';

type Key = 'Name' | 'Date' | 'Weight' | 'Price' | 'Tax';
const KEYS: Record<string, Key> = {
  name: `Name`,
  date: `Date`,
  w: `Weight`,
  price: `Price`,
  tax: `Tax`
};

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less'],
  providers: [TuiDestroyService]
})
export class ServiceTableComponent implements OnInit {
  @Input() set services(value: Service[]) {
    if (value?.length) {
      this.servicesSubject.next(value);
    }
  }
  private servicesSubject = new BehaviorSubject<Service[]>(null);

  @Input() hideDateColumn = false;

  @Output() selected = new EventEmitter<Service[]>();

  routing = environment.routing;
  form: FormGroup;
  columns = ['Name', 'Date', 'Weight', 'Price'];
  initial = ['Name', 'Date', 'Weight', 'Price', 'Tax'];
  readonly arrow = TUI_ARROW;

  serviceListData$: Observable<Service[]>;

  constructor(
    private serviceService: ServicesService,
    private destroy$: TuiDestroyService
  ) {
    this.createForm();
    this.fetch();

    this.servicesSubject
      .pipe(
        filter((services) => !!services),
        distinctUntilChanged(
          (a, b) =>
            JSON.stringify(this.form.get('tableRowArray').value) ===
            JSON.stringify(b)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (services) => {
          services.forEach((element, index) => {
            this.addNewRow(element);
          });
          this.deleteRow(0);
        }
      });

    this.form
      .get('tableRowArray')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.doEmit()
      });

    this.serviceListData$
      .pipe(filter((data) => !data))
      .subscribe((data) => this.groupService(data));
  }

  ngOnInit(): void {}

  fetch(): void {
    // this.serviceListData$ = this.serviceService.getAll$();
    this.serviceListData$ = this.serviceService.getAll$().pipe(
      filter((data) => !!data),
      map((services) => this.groupService(services))
    );
  }

  private createForm(): void {
    this.form = new FormGroup({
      tableRowArray: new FormArray([this.createTableRow()])
    });
  }

  private createTableRow(serviceItem?: Service): FormGroup {
    return new FormGroup({
      name: new FormControl(serviceItem?.name || null, {
        validators: [Validators.required]
      }),
      date: new FormControl(
        serviceItem ? this.convertDate(serviceItem?.date) : this.initDate(),
        {
          validators: [Validators.required]
        }
      ),
      count: new FormGroup({
        amount: new FormControl(serviceItem?.count.amount || null, {
          validators: [Validators.required]
        }),
        isEditable: new FormControl(serviceItem?.count.isEditable, {
          validators: [Validators.required]
        })
      }),
      price: new FormGroup({
        amount: new FormControl(serviceItem?.price.amount || null, {
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
        amount: new FormControl(serviceItem?.totalSum.amount || null, {
          // validators: [Validators.required]
        }),
        currency: new FormControl(serviceItem?.totalSum.currency || null, {
          validators: [Validators.required]
        })
      }),
      tax: new FormGroup({
        _id: new FormControl(serviceItem?.tax._id || null, {
          validators: [Validators.required]
        }),
        amount: new FormControl(serviceItem?.tax.amount || null, {
          // validators: [Validators.required]
        }),
        desc: new FormControl(serviceItem?.tax.desc || null),
        isCalculate: new FormControl(serviceItem?.tax.isCalculate || null, {
          // validators: [Validators.required]
        }),
        label: new FormControl(serviceItem?.tax.label || null, {
          validators: [Validators.required]
        })
      }),
      totalTax: new FormGroup({
        amount: new FormControl(serviceItem?.totalTax.amount || null, {
          // validators: [Validators.required]
        }),
        currency: new FormControl(serviceItem?.totalTax.currency || null, {
          validators: [Validators.required]
        })
      }),
      isFreePrice: new FormControl(serviceItem?.isFreePrice || null)
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

  convertDate(date): TuiDay {
    if (date) {
      if (typeof date === 'string') {
        return TuiDay.jsonParse(date.toString());
      } else {
        return date;
      }
    } else {
      return null;
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

    // isFreePrice
    control.isFreePrice.setValue(event.isFreePrice);

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
  }

  getRowArrayValue(): any {
    return this.form.get('tableRowArray').value;
  }

  doEmit(): void {
    if (this.form.valid) {
      this.selected.emit(this.form.get('tableRowArray').value);
    } else {
      this.selected.emit(null);
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

  groupService(services: Service[]): any[] {
    const groupedByGroupName = services.reduce((groupedList, product) => {
      const groupName = product.group.name as any;
      groupedList[groupName] = groupedList[groupName] ?? [];
      groupedList[groupName].push(product);
      return groupedList;
    }, {});

    return Object.entries(groupedByGroupName);
  }

  onEnabled(enabled: readonly string[]): void {
    // this.enabled = enabled;
    this.columns = this.initial
      .filter((column) => enabled.includes(column))
      .map((column) => KEYS[column]);
  }
}
