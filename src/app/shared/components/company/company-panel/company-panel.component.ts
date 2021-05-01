import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less']
})
export class CompanyPanelComponent implements OnInit, OnChanges {
  @Input() data: Company;
  @Input() isLoaded: boolean;
  @Output() change = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      let cl = new Company();
      cl.isCompanyValid(changes.data.currentValue);
    }
  }
}
