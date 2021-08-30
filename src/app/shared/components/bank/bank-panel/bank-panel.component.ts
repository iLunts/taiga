import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Bank } from 'src/app/models/bank.model';

@Component({
  selector: 'app-bank-panel',
  templateUrl: './bank-panel.component.html',
  styleUrls: ['./bank-panel.component.less'],
})
export class BankPanelComponent implements OnInit, OnChanges {
  @Input() data: Bank;
  @Input() isLoaded: boolean;
  @Output() change = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.data) {
      // this.companyService.isCompanyValid(changes.data.currentValue);
    }
  }
}
