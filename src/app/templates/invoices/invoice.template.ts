import { INVOICE_TEMPLATE_HEADER } from './invoice-header.template';
import { REQUISITES_SIGN_TABLE_TEMPLATE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE_TEMPLATE } from '../common/requisites.template';
import { SERVICES_TEMPLATE_TABLE } from '../common/services.template';

// export const INVOICE_TEMPLATE_LOGO = `
// <table style="width: 100%; border-width: 0">
//   <tbody>
//     <tr>
//       <td style="width: 50%; border: 0">
//         <p
//           style="
//             font-size: 14px;
//             margin: 3px 0;
//             color: #5b5b5b;
//             text-align: left;
//           "
//         >
//           LOGOTYPE
//         </p>
//       </td>
//       <td style="width: 50%; border: 0">
//         <p style="font-size: 21px; color: #ff0000; text-align: right">
//           Счет # {{documentNumber number}}
//         </p>
//         <p style="font-size: 12px; color: #5b5b5b; text-align: right">
//           <small>Дата создания: </small> {{formatDate createDate "DD.MM.YYYY"}}<br />
//           <small>Счет действителен до: {{formatDate expiredDate "DD.MM.YYYY"}}</small>
//         </p>
//       </td>
//     </tr>
//   </tbody>
// </table>`;

// export const INVOICE_TEMPLATE_QR_CODE = `<p class="invoice-sign">Отсканируйте код из мобильного приложения invoices.by чтобы открыть документ
// <img src="{{qrCode}}" style="display: inline-block; vertical-align: middle; width: 100px; margin-left: 15px;"/></p>`;

export const INVOICE_TEMPLATE_ALL =
  INVOICE_TEMPLATE_HEADER +
  SERVICES_TEMPLATE_TABLE +
  REQUISITES_TABLE_TEMPLATE +
  REQUISITES_SIGN_TABLE_TEMPLATE;
