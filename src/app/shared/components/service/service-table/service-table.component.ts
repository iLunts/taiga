import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { takeUntil } from 'rxjs/operators';
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
    if (services?.length) {
      this.preloadServices(services);
    }
  }
  get services(): Service[] {
    return this._services;
  }
  private _services: Service[];

  @Output() selected = new EventEmitter<Service[]>();

  form: FormGroup;
  columns: ['name', 'date', 'w', 'price'];
  services$: Observable<Service[]>;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService,
    private destroy: TuiDestroyService
  ) {
    this.createForm();
    this.fetch();
  }

  ngOnInit(): void {}

  fetch(): void {
    this.services$ = this.serviceService.getAll$();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([this.createTableRow()])
    });

    this.onChanges();
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
      unit: new FormControl(serviceItem?.unit || '', {
        validators: [Validators.required]
      }),
      count: new FormControl(serviceItem?.count || null, {
        validators: [Validators.required]
      }),
      price: new FormControl(serviceItem?.price || null, {
        validators: [Validators.required]
      }),
      amount: new FormControl(serviceItem?.count * serviceItem?.price || null, {
        validators: [Validators.required]
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

  selectedService(event: Service, index: number): void {
    const control = this.form.get('tableRowArray')['controls'][index].controls;

    control.count.setValue(event.count);
    control.price.setValue(event.price);
    control.amount.setValue((event.count * event.price).toFixed(2));
    control.unit.setValue(event.unit);
  }

  calculateSum(event: FormGroup, index: number): void {
    const control = this.form.get('tableRowArray')['controls'][index].controls;
    control.amount.setValue(
      (event.controls.count.value * event.controls.price.value).toFixed(2)
    );
  }

  getUnit(): string {
    return 'test';
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

  onChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe((val) => {
      this.sortTableByDate();
      this.doEmit();
    });
  }

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
