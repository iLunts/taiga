import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less']
})
export class StatusPanelComponent implements OnInit, OnDestroy {
  @Input() set type(value: string) {
    this.typeSubject.next(value);
  }
  private typeSubject = new ReplaySubject<string>(1);
  type$ = this.typeSubject.asObservable();

  @Input() set status(value: Status) {
    this.statusSubject.next(value);
  }
  private statusSubject = new ReplaySubject<Status>(1);
  status$: Observable<Status> = this.statusSubject.asObservable();

  @Output() changed = new EventEmitter<Status>();

  statuses$: Observable<Status[]>;
  statusControl = new FormControl(null, [Validators.required]);

  private readonly destroySubject = new Subject();

  constructor(private statusesService: StatusService) {
    // TODO: Need to check twiceCall
    this.statuses$ = this.type$.pipe(
      filter((type: string) => !!type),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((type: string) =>
        this.statusesService.getAll$(type).pipe(
          filter((statuses) => !!statuses),
          tap((statuses: Status[]) => this.selectStatus(statuses[0]))
        )
      )
      // shareReplay()
    );

    this.statusSubject
      .pipe(
        filter((status) => !!status),
        tap((status) => this.selectStatus(status)),
        takeUntil(this.destroySubject)
      )
      .subscribe();

    // TODO: Need to check twiceCall
    this.statusControl.valueChanges
      .pipe(
        filter((status: Status) => !!status),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
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
    this.statusControl.setValue(status);
    this.changed.emit(status);
  }
}
