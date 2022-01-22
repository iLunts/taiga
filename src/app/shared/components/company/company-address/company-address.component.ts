import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-address',
  templateUrl: './company-address.component.html',
  styleUrls: ['./company-address.component.less']
})
export class CompanyAddressComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);

  @Output() onChange = new EventEmitter<Company>();

  private readonly destroySubject = new Subject();
  isExpandedCustomAddress = false;
  isValidCompany: boolean;
  samePostMailControl: FormControl = new FormControl({
    value: false,
    disabled: true
  });

  constructor(private companyService: CompanyService) {
    this.companySubject
      .pipe(
        filter((company) => !!company),
        switchMap((company: Company) =>
          this.companyService.checkCompanyInfoValid$(company)
        )
      )
      .subscribe((validInfo: boolean) => {
        if (validInfo) {
          this.samePostMailControl.enable();
        } else {
          this.samePostMailControl.disable();
        }
        this.checkExpandCustomAddress();
      });

    this.samePostMailControl.valueChanges
      .pipe(
        withLatestFrom(this.companySubject),
        filter(([, company]) => !!company),
        map(([control, company]) => ({
          ...company,
          mailingAddress: control
            ? company.juridicalAddress
            : company.mailingAddress
        }))
      )
      .subscribe((company: Company) => {
        this.checkExpandCustomAddress();
        this.onChange.emit(company);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();

    this.companySubject.complete();
  }

  checkExpandCustomAddress(): void {
    this.isExpandedCustomAddress = this.samePostMailControl.value
      ? true
      : false;
  }
}
