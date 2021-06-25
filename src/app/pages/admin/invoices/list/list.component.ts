import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class InvoicesListComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  invoiceStatuses$: Observable<any[]>;
  isLoaded: boolean;
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];
  routing = environment.routing;

  constructor(private _invoice: InvoiceService) {}

  ngOnInit(): void {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this._invoice.getAllStatus$();
  }

  fetch(): void {
    this.invoices$ = this._invoice.getAll$();
  }

  delete(item: Invoice): void {
    if (item) {
      this._invoice.delete$(item._id);
    }
  }
}
