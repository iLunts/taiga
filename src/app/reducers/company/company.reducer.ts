// import { Action, createReducer, on } from '@ngrx/store';
// import { stat } from 'fs';

import { Company } from 'src/app/models/company.model';
import { CompanyActions, companyActionTypes } from './company.actions';

export const companyFeatureKey = 'company';

export interface CompanyState {
  updateAt: number;
  company: Company;
}

export const initialState: CompanyState = {
  updateAt: Date.now(),
  company: new Company(),
};

// export const companyReducer = createReducer(initialState);
// export const companyReducer = (
export function reducer(state = initialState, action: CompanyActions) {
  switch (action.type) {
    case companyActionTypes.SET: {
      return {
        ...state,
        updateAt: new Date(),
      };
    }
    case companyActionTypes.CLEAR: {
      return new Company();
    }
    case companyActionTypes.SELECT: {
      // const id = action.payload;
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
