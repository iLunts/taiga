import { REQUISITES_TABLE_TEMPLATE } from '../common/requisites.template';
import { SERVICES_TEMPLATE_TABLE } from '../common/services.template';

export const INVOICE_TEMPLATE_LOGO = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          LOGOTYPE
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p style="font-size: 21px; color: #ff0000; text-align: right">
          Счет # {{documentNumber number}}
        </p>
        <p style="font-size: 12px; color: #5b5b5b; text-align: right">
          <small>Дата создания: </small> {{formatDate createDate "DD.MM.YYYY"}}<br />
          <small>Счет действителен до: {{formatDate expiredDate "DD.MM.YYYY"}}</small>
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
export const INVOICE_TEMPLATE_HEADER = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #333333;
            font-weight: 600;
            text-align: left;
          "
        >
          <strong>Получатель</strong>
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{profileCompany.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{profileCompany.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{profileCompany.juridicalAddress.zipCode}}&nbsp;
          {{profileCompany.juridicalAddress.country}}&nbsp;
          г. {{profileCompany.juridicalAddress.city}}&nbsp;
          ул. {{profileCompany.juridicalAddress.street}}&nbsp;
          д.{{profileCompany.juridicalAddress.houseNumber}}&nbsp;
          оф.{{profileCompany.juridicalAddress.office}}&nbsp;
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #333333;
            font-weight: 600;
            text-align: left;
          "
        >
          <strong>Плательщик</strong>
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          {{contractor.info.fullName}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          УНП: {{contractor.info.unp}}
        </p>
        <p
          style="
            font-size: 14px;
            margin: 3px 0;
            color: #5b5b5b;
            text-align: left;
          "
        >
          Юр. адрес: {{contractor.juridicalAddress.zipCode}}&nbsp;
          {{contractor.juridicalAddress.country}}&nbsp;
          г. {{contractor.juridicalAddress.city}}&nbsp;
          ул. {{contractor.juridicalAddress.street}}&nbsp;
          д.{{contractor.juridicalAddress.houseNumber}}&nbsp;
          оф.{{contractor.juridicalAddress.office}}&nbsp;
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
export const INVOICE_TEMPLATE_NOTE = `
<p class="invoice-note">Всего наименований 2(два), на сумму {{getTotalSumDigs}} ({{getTotalSum}})</p>
`;
export const INVOICE_TEMPLATE_SIGN = `
<p class="invoice-sign">
  {{profileCompany.info.fullName}} 
  <img src="{{signature.sign}}" style="display: inline-block; vertical-align: middle; width: 130px;"/> (подпись)
</p>`;
export const INVOICE_TEMPLATE_QR_CODE = `<p class="invoice-sign">Отсканируйте код из мобильного приложения invoices.by чтобы открыть документ
<img src="{{qrCode}}" style="display: inline-block; vertical-align: middle; width: 100px; margin-left: 15px;"/></p>`;

export const INVOICE_TEMPLATE_ALL =
  INVOICE_TEMPLATE_LOGO +
  REQUISITES_TABLE_TEMPLATE +
  SERVICES_TEMPLATE_TABLE +
  INVOICE_TEMPLATE_QR_CODE;
