import { REQUISITES_TABLE } from '../common/requisites.template';

export const ACT_TEMPLATE_LOGO = `
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
          Акт # {{invoiceNumber number}}
        </p>
        <p style="font-size: 12px; color: #5b5b5b; text-align: right">
          <small>Дата: </small> {{formatDate date "DD.MM.YYYY"}}<br />
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
export const ACT_TEMPLATE_HEADER = `
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
export const ACT_TEMPLATE_TABLE = `
<table style="width: 100%; margin: 40px 0; vertical-align: middle;">
  <thead>
    <tr>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">П.п.</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; text-align: left;">Наименование товара</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Ед. измерения</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Кол-во</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Цена</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">НДС</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; width: 20%;">Сумма</th>
    </tr>
  </thead>
  <tbody>
    {{#each services}}
    <tr style="vertical-align: middle; border-bottom: 1px solid #333;">
      <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; text-align: center;">{{getIndex @index}}</td>
      <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.name.name}}</td>
      <td valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; text-align: center;">{{this.unit.shortName}}</td>
      <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;"><strong>{{this.count}}</strong></td>
      <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.price}}</td>
      <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px;">{{this.tax}}</td>
      <td class="cell--bold" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; line-height: 1.9px; width: 20%;">{{this.amount}}</td>
    </tr>
    {{/each}}
    <tr>
      <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Итого:</td>
      <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
    </tr>
    <tr>
      <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего с НДС:</td>
      <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Без НДС</td>
    </tr>
    <tr>
      <td colspan="6" class="invoice-cell-footer-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего к оплате с НДС:</td>
      <td class="invoice-cell-footer-summa" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
    </tr>
  </tbody>
</table>

<p class="invoice-note">Всего наименований {{getIndex @index}}, на сумму {{getTotalSumDigs}} ({{getTotalSum}})</p>

`;
export const ACT_TEMPLATE_NOTE = `
<p class="invoice-note">Всего наименований 2(два), на сумму {{getTotalSumDigs}} ({{getTotalSum}})</p>
`;
export const ACT_TEMPLATE_SIGN = `
<p class="invoice-sign">
  {{profileCompany.info.fullName}} 
  <img src="{{signature.sign}}" style="display: inline-block; vertical-align: middle; width: 130px;"/> (подпись)
</p>`;
export const ACT_TEMPLATE_QR_CODE = `<p class="invoice-sign">Отсканируйте код из мобильного приложения invoices.by чтобы открыть документ
<img src="{{qrCode}}" style="display: inline-block; vertical-align: middle; width: 100px; margin-left: 15px;"/></p>`;

export const ACT_TEMPLATE_ALL =
  ACT_TEMPLATE_LOGO +
  REQUISITES_TABLE +
  ACT_TEMPLATE_TABLE +
  ACT_TEMPLATE_QR_CODE;
