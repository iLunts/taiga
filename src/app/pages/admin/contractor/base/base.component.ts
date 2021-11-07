import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less']
})
export class ContractorBaseComponent implements OnInit {
  isOpenAsideContractorCreate: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggleAsideContractorCreate(): void {
    this.isOpenAsideContractorCreate = !this.isOpenAsideContractorCreate;
  }
}
