export const HEADER_TEMPLATE_LOGO = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 25%; border: 0"></td>
      <td style="width: 50%; border: 0">
        <p class="html-title">
            Акт №{{number}}
        </p>
        <p class="html-title">
            Выполненных работ
        </p>
        <p class="html-subtitle">
            по договору №б/н от {{formatDate createDate "DD MMMM YYYY"}} г.
        </p>
      </td>
      <td style="width: 25%; border: 0">
        <p style="font-size: 14px; color: #5b5b5b; text-align: right;">
          от {{formatDate contract.date "DD MMMM YYYY"}} г.
        </p>
      </td>
    </tr>
  </tbody>
</table>
<br />
<p class="html-text">
  Мы, нижеподписавшиеся, ИП Лунцевич В.В., с одной стороны – ООО «ЮВП-Альянс» в лице директора 
  Тулатина Павла Николаевича действующего на основании устава с другой стороны, составили настоящий Акт о том, что Арендодателем в соответствии с условиями вышеуказанного договора были оказаны услуги по аренде мини-экскаватора:
</p>`;
