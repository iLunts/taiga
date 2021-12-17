import { BehaviorSubject, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Bank } from 'src/app/models/bank.model';

@Component({
  selector: 'app-bank-panel',
  templateUrl: './bank-panel.component.html',
  styleUrls: ['./bank-panel.component.less']
})
export class BankPanelComponent implements OnInit {
  @Input() isLoaded: boolean;
  @Input() set bank(bank: Bank) {
    this.bankSubject.next(bank);
  }
  private bankSubject = new BehaviorSubject<Bank>(null);
  bank$: Observable<Bank> = this.bankSubject.asObservable();

  @Output() change = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
