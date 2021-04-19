import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class InvoicesListComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  invoiceStatuses$: Observable<any[]>;
  isLoaded: boolean;
  readonly columns = ['name', 'email', 'status', 'tags', 'actions'];


  constructor(
    private _invoice: InvoiceService,
    // public _db: AngularFireDatabase,
    // private _notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this._invoice.getAllStatus();
  }

  fetch(): void {
    this.invoices$ = this._invoice.getAll();
  }
}
