import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less']
})
export class CompanyPanelComponent implements OnInit, OnChanges {
  @Input() data: Company;
  @Input() isLoaded: boolean;
  @Input() canChange: boolean;
  @Output() change = new EventEmitter<boolean>();

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      let cl = new Company();
      this.companyService.isCompanyValid(changes.data.currentValue);
    }
  }
}
