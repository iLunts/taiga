import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPanelComponent implements OnInit {
  @Input() set data(data: Company) {
    this.dataSubject.next(data);
  }
  private dataSubject = new BehaviorSubject<Company>(null);
  data$: Observable<Company> = this.dataSubject.asObservable().pipe(
    filter((company) => !!company),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  @Input() isLoaded: boolean;
  @Input() canChange: boolean;
  @Output() change = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
