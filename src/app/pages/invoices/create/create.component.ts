import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class InvoicesCreateComponent implements OnInit {
  statuses$: Observable<InvoiceStatus[]>;

  constructor(
    private invoiceStatuses: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.fetchStatuses();
  }

  fetchStatuses(): void {
    this.statuses$ = this.invoiceStatuses.getAllStatus$();
  }

}
