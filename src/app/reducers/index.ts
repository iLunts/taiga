import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';
import { companyFeatureKey, CompanyState } from './company/company.reducer';

export interface State {
  // [companyFeatureKey]: CompanyState;
}

export const reducers: ActionReducerMap<State> = {
  // [companyFeatureKey]: CompanyRe,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
