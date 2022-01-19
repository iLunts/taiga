import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyStoreService extends EntityCollectionServiceBase<Company> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Company', serviceElementsFactory);
  }
}
