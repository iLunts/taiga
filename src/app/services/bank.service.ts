import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Bank, BankAccount } from '../models/bank.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(
    private _http: HttpClient,
    private _notification: NotificationService,
  ) {}

  getBankByBIC(bic: string): Bank {
    let bankInfo = new Bank();

    from(this._http.get(`https://www.nbrb.by/api/bic?cdbank=${bic}`)).subscribe(
      {
        next: (response) => {
          if (response) {
            bankInfo = response[0];
          }
        },
      }
    );

    return bankInfo;
  }
}
