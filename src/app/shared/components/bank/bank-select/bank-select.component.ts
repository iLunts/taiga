import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiReplayedValueChangesFrom, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank.model';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.less'],
})
export class BankSelectComponent implements OnInit {
  @Output() change = new EventEmitter<Bank>();

  constructor(private _bank: BankService) {
    this._bank.getAllBank$().subscribe({
      next: (response) => {
        this.banks = response;
      },
    });
  }

  banks: Bank[] = [];
  banks$: Observable<Bank[]>;

  private readonly bankVal = new FormControl(null, Validators.required);
  readonly form = new FormGroup({
    bank: this.bankVal,
  });

  readonly banksSort$ = tuiReplayedValueChangesFrom<string>(this.bankVal).pipe(
    map((value) => {
      const filtered = this.banks.filter(
        (data) =>
          TUI_DEFAULT_MATCHER(data.CDBank, value) ||
          (TUI_DEFAULT_MATCHER(data.NmBankShort, value) && data.DtEnd === null)
      );

      if (
        filtered.length !== 1 ||
        String(filtered[0]).toLowerCase() !== value.toLowerCase()
      ) {
        return filtered;
      }

      this.onSelected(filtered[0]);

      return [];
    })
  );

  ngOnInit(): void {
    this.banks$ = this.getAllBank();
  }

  getAllBank(): Observable<Bank[]> {
    return this._bank.getAllBank$();
  }

  onSelected(bank: Bank) {
    // this.lastUser = user;
    this.form.get('bank')!.setValue(bank);
    this.change.emit(this.form.controls.bank.value);
  }
}
