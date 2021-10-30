import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less'],
})
export class StatusPanelComponent implements OnInit, OnDestroy {
  @Input() set type(value: string) {
    this.typeSubject.next(value);
  }
  private typeSubject = new ReplaySubject<string>(1);
  type$ = this.typeSubject.asObservable();

  @Output() selected = new EventEmitter<Status>();

  statuses$: Observable<Status[]>;
  form = new FormGroup({
    status: new FormControl(null, [Validators.required]),
  });
  private readonly destroySubject = new Subject();

  constructor(private statusesService: StatusService) {
    this.statuses$ = this.type$.pipe(
      filter((type: string) => !!type),
      distinctUntilChanged(),
      switchMap((type: string) =>
        this.statusesService.getAll$(type).pipe(
          filter((statuses: Status[]) => !!statuses),
          tap((statuses: Status[]) => this.selectStatus(statuses[0]))
        )
      ),
      shareReplay()
    );

    this.form.controls.status.valueChanges
      .pipe(
        filter((status: Status) => !!status),
        distinctUntilChanged(),
        tap((status: Status) => this.selectStatus(status)),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  selectStatus(status: Status): void {
    this.form.controls.status.setValue(status);
    this.selected.emit(status);
  }
}
