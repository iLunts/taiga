import { Action, createAction, props } from '@ngrx/store';

export enum companyActionTypes {
  SET = '[Company] Set',
  GET = '[Company] Get',
  CLEAR = '[Company] Clear',
  SUCCESS = '[Company] Success',
  ERROR = '[Company] Failure',
  UPDATE = '[Company] Updated',
  SELECT = '[Company] Selected',
}

// export const invCompany = createAction('[Company] Inv Companys');

// export const invCompanySuccess = createAction(
//   companyActionTypes.success,
//   props<{ data: any }>()
// );

// export const invCompanyFailure = createAction(
//   companyActionTypes.error,
//   props<{ error: any }>()
// );

export class CompanySetAction implements Action {
  readonly type = companyActionTypes.SET;
}

export class CompanyClearAction implements Action {
  readonly type = companyActionTypes.CLEAR;
}

export class CompanySelectAction implements Action {
  readonly type = companyActionTypes.SELECT;
}

export type CompanyActions =
  | CompanySetAction
  | CompanyClearAction
  | CompanySelectAction;
