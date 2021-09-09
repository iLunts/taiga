import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';
import { companyFeatureKey, CompanyState } from './company.reducer';

const selectCompanyFeature =
  createFeatureSelector<CompanyState>(companyFeatureKey);

export const selectCompany = createSelector(
  selectCompanyFeature,
  (state: CompanyState): Company => state.company
);
