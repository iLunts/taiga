import { HEADER_TEMPLATE } from '../common/header.template';
import { REQUISITES_SIGN_TABLE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE } from '../common/requisites.template';
import { SERVICES_TEMPLATE_TABLE } from '../common/services.template';

export const ACT_TEMPLATE_ALL =
  HEADER_TEMPLATE +
  SERVICES_TEMPLATE_TABLE +
  REQUISITES_TABLE +
  REQUISITES_SIGN_TABLE;
