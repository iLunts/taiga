import { REQUISITES_SIGN_TABLE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE } from '../common/requisites.template';
import { CONTRACT_CONTENT_TEMPLATE } from './contract-concent.template';
import { CONTRACT_HEADER_TEMPLATE } from './contract-header.template';

export const CONTRACT_TEMPLATE_ALL =
  CONTRACT_HEADER_TEMPLATE +
  CONTRACT_CONTENT_TEMPLATE +
  REQUISITES_TABLE +
  REQUISITES_SIGN_TABLE;
