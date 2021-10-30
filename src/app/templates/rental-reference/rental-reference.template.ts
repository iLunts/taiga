import { RENTAL_CERTIFICATE_HEADER_TEMPLATE } from './rental-reference-header.template';
import { RENTAL_CERTIFICATE_PRE_HEADER_TEMPLATE } from './rental-reference-pre-header.template';
import { REQUISITES_SIGN_TABLE_TEMPLATE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE_TEMPLATE } from '../common/requisites.template';
import { SERVICES_TEMPLATE_TABLE } from '../common/services.template';

export const RENTAL_REFERENCE_TEMPLATE_ALL =
  RENTAL_CERTIFICATE_PRE_HEADER_TEMPLATE +
  RENTAL_CERTIFICATE_HEADER_TEMPLATE +
  SERVICES_TEMPLATE_TABLE +
  REQUISITES_TABLE_TEMPLATE +
  REQUISITES_SIGN_TABLE_TEMPLATE;
