import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPanelComponent implements OnInit {
  @Input() set data(data: Company) {
    this.dataSubject.next(data);
  }
  private dataSubject = new Subject<Company>();
  data$: Observable<Company>;

  @Input() isLoaded: boolean;
  @Input() canChange: boolean;
  @Output() change = new EventEmitter<boolean>();

  constructor() {
    this.data$ = this.dataSubject.pipe(
      filter((company) => !!company),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  ngOnInit(): void {}
}
