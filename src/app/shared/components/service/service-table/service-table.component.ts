import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less']
})
export class ServiceTableComponent implements OnInit {
  readonly items = ['Black', 'Gold', 'Silver'];
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
    quantity: new FormControl(),
    sum: new FormControl(255),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
