import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less']
})
export class StatusPanelComponent implements OnInit {
  @Output() selected = new EventEmitter<InvoiceStatus>();

  statuses$: Observable<InvoiceStatus[]>;
  form = new FormGroup({
      status: new FormControl(null, [Validators.required])
  });

  readonly status = new FormControl(null);

  constructor(
    private invoiceStatusesService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.statuses$ = this.invoiceStatusesService.getAllStatus$();
  }
}
