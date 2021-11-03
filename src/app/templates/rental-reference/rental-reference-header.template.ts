export const RENTAL_CERTIFICATE_HEADER_TEMPLATE = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 25%; border: 0"></td>
      <td style="width: 50%; border: 0">
        <p class="html-title">
          Справка аренды №{{number}}
          <br/>
          о времени аренды строительной машины
          <br/>
          за [dateStart] [месяца] [года]
        </p>
        <p class="html-subtitle">
          по договору №б/н от {{formatDate createDate "DD MMMM YYYY"}} г.
        </p>
      </td>
      <td style="width: 25%; border: 0"></td>
    </tr>
  </tbody>
</table>`;