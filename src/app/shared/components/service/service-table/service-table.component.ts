import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less'],
})
export class ServiceTableComponent implements OnInit {
  form: FormGroup;
  columns: ['name', 'date', 'quantity', 'price'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
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
      date: new FormControl(null, {
        validators: [Validators.required],
      }),
      quantity: new FormControl(1, {
        validators: [Validators.required],
      }),
      price: new FormControl(0, {
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


}
