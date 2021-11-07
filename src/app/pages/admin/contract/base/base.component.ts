import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less']
})
export class ContractBaseComponent implements OnInit {
  routing = environment.routing;

  constructor() {}

  ngOnInit(): void {}
}
