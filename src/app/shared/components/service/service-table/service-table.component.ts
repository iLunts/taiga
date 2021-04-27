import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less'],
})
export class ServiceTableComponent implements OnInit {
  form: FormGroup;
  columns: ['name', 'date', 'quantity', 'price'];
  services$: Observable<Service[]>;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetch();
  }

  fetch(): void {
    this.services$ = this.serviceService.getAll$();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([this.createTableRow()]),
    });
  }

  private createTableRow(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      date: new FormControl(this.initDate(), {
        validators: [Validators.required],
      }),
      quantity: new FormControl(null, {
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  get tableRowArray(): FormArray {
    return this.form.get('tableRowArray') as FormArray;
  }

  addNewRow(): void {
    this.tableRowArray.push(this.createTableRow());
  }

  deleteRow(rowIndex: number): void {
    this.tableRowArray.removeAt(rowIndex);
  }

  initDate(): any {
    let format = 'DD.MM.YYYY';
    if (this.form) {
      let lastIndex = this.form.get('tableRowArray')['controls'].length - 1;
      let date = this.form.get('tableRowArray')['controls'][lastIndex].controls
        .date.value;
      return TuiDay.normalizeParse(moment(date).add(1, 'day').format(format));
    } else {
      return TuiDay.normalizeParse(moment().format(format));
    }
  }

  selectedService(event: Service, index: number): void {
    let control = this.form.get('tableRowArray')['controls'][index].controls;
    control.quantity.setValue(event.count);
    control.price.setValue(event.price);
    control.amount.setValue(event.count * event.price);
  }
  
  calculateSum(event: FormGroup, index: number): void {
    let control = this.form.get('tableRowArray')['controls'][index].controls;
    control.amount.setValue(event.controls.quantity.value * event.controls.price.value);
  }
}
