import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ContractorListComponent implements OnInit {
  routing = environment.routing;

  constructor() { }

  ngOnInit(): void {
  }
}
