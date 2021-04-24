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
  readonly columns = ['number', 'unp', 'status', 'price', 'action'];


  constructor(
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.fetchStatuses();
    this.fetch();
  }

  fetchStatuses(): void {
    this.invoiceStatuses$ = this.invoiceService.getAllStatus$();
  }

  fetch(): void {
    this.invoices$ = this.invoiceService.getAll$();
  }

  remove(item): void {
  }
}
