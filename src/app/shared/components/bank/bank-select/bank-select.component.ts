import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  tuiReplayedValueChangesFrom,
  TUI_DEFAULT_MATCHER
} from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank.model';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.less']
})
export class BankSelectComponent implements OnInit {
  @Output() change = new EventEmitter<Bank>();

  constructor(private bankService: BankService) {
    this.bankService.getAllBank$().subscribe({
      next: (bank: Bank[]) => {
        this.banks = bank;
      }
    });
  }

  banks: Bank[] = [];
  banks$: Observable<Bank[]>;
  bankControl = new FormControl(null, Validators.required);
  banksSort$ = tuiReplayedValueChangesFrom<string>(this.bankControl).pipe(
    map((value: string) => {
      const filtered = this.banks.filter(
        (bank: Bank) =>
          TUI_DEFAULT_MATCHER(bank.CDBank, value) ||
          (TUI_DEFAULT_MATCHER(bank.NmBankShort, value) && bank.DtEnd === null)
      );

      if (
        filtered.length !== 1 ||
        String(filtered[0]).toLowerCase() !== value.toLowerCase()
      ) {
        return filtered;
      }

      this.select(filtered[0]);

      return [];
    })
  );

  ngOnInit(): void {
    this.banks$ = this.getAllBank();
  }

  getAllBank(): Observable<Bank[]> {
    return this.bankService.getAllBank$();
  }

  select(bank: Bank): void {
    this.change.emit(bank);
    this.bankControl.setValue(bank.NmBankShort + ' (' + bank.CDBank + ')');
  }
}
