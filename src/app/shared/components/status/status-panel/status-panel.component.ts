import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less']
})
export class StatusPanelComponent implements OnInit {
  statuses$: Observable<InvoiceStatus[]>;

  constructor(
    private invoiceStatuses: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.statuses$ = this.invoiceStatuses.getAllStatus$();
  }
}
