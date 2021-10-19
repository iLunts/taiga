export const REQUISITES_TABLE = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p class="html-requisites-title">
          Получатель
        </p>
        <p class="html-requisites">
          {{profileCompany.info.fullName}}
          <br />
          УНП: {{profileCompany.info.unp}}
          <br />
          Юр. адрес: {{profileCompany.juridicalAddress.zipCode}}&nbsp;
          {{profileCompany.juridicalAddress.country}}&nbsp;
          г. {{profileCompany.juridicalAddress.city}}&nbsp;
          ул. {{profileCompany.juridicalAddress.street}}&nbsp;
          д.{{profileCompany.juridicalAddress.houseNumber}}&nbsp;
          оф.{{profileCompany.juridicalAddress.office}}&nbsp;
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p class="html-requisites-title">
          Плательщик
        </p>
        <p class="html-requisites">
          {{contractor.info.fullName}}
          <br />
          УНП: {{contractor.info.unp}}
          <br />
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
