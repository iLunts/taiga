import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-aside',
  templateUrl: './contractor-aside.component.html',
  styleUrls: ['./contractor-aside.component.less']
})
export class ContractorAsideComponent implements OnInit {
  searchControl = new FormControl(null);
  contractors$: Observable<Contractor[]>;

  constructor(private contractorService: ContractorService) {
    this.contractors$ = this.contractorService.getAll$();
  }

  ngOnInit(): void {}
}
