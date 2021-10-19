export const SERVICES_TEMPLATE_TABLE = `
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
