import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { InvoiceStatus } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less'],
})
export class StatusPanelComponent implements OnInit, OnDestroy {
  @Output() selected = new EventEmitter<InvoiceStatus>();

  private readonly destroy$ = new Subject();
  statuses$: Observable<InvoiceStatus[]>;
  form = new FormGroup({
    status: new FormControl(null, [Validators.required]),
  });

  readonly status = new FormControl(null);

  constructor(private invoiceStatusesService: InvoiceService) {
    this.fetch();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  fetch(): void {
    this.statuses$ = this.invoiceStatusesService.getAllStatus$().pipe(
      tap((statuses: InvoiceStatus[]) => {
        if (statuses?.length) {
          this.selected.emit(statuses[0]);
          this.form.controls.status.setValue(statuses[0]);
        }
      }),
      takeUntil(this.destroy$)
    );
  }
}
