import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}

  isCompanyValid(company: Company): boolean {
    return Object.values(company).every((c) => c !== null);
  }
}
