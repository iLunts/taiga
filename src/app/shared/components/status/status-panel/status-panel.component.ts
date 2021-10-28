import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less'],
})
export class StatusPanelComponent implements OnInit {
  @Output() selected = new EventEmitter<Status>();

  statuses$: Observable<Status[]>;
  form = new FormGroup({
    status: new FormControl(null, [Validators.required]),
  });

  constructor(private statusesService: StatusService) {
    this.statuses$ = this.statusesService.getAll$('/invoiceStatuses').pipe(
      filter((statuses: Status[]) => !!statuses),
      tap((statuses: Status[]) => this.selectStatus(statuses[0]))
    );
  }

  ngOnInit(): void {}

  selectStatus(status: Status): void {
    this.selected.emit(status);
    this.form.controls.status.setValue(status);
  }
}
