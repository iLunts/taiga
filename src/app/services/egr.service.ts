import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import { Company, CompanyInfo, CompanyAddress } from '../models/company.model';
import { NotificationService } from './notification.service';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  constructor(
    private _http: HttpClient,
    private _notification: NotificationService,
    private companyService: CompanyService
  ) {}

  getBaseInfoByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getBaseInfoByRegNum/${UNP}`
      )
    );
  }

  getAddressByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getAddressByRegNum/${UNP}`
      )
    );
  }

  getJurNamesByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getJurNamesByRegNum/${UNP}`
      )
    );
  }

  getVEDByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(`https://solidexcrm.com/api/v2/egr/getVEDByRegNum/${UNP}`)
    );
  }

  getIPFIOByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getIPFIOByRegNum/${UNP}`
      )
    );
  }

  getAllByUnp(UNP: string): Company {
    let company: Company = new Company();

    // const observable = forkJoin([
    forkJoin([
      this.getBaseInfoByRegNum$(UNP),
      this.getAddressByRegNum$(UNP),
      this.getJurNamesByRegNum$(UNP),
      this.getVEDByRegNum$(UNP),
      this.getIPFIOByRegNum$(UNP),
    ]).subscribe({
      // observable.subscribe({
      next: (response) => {
        if (response.every((element) => element === null)) {
          this._notification.warning(
            'Введенный вами УНП не был найден в базе ЕГР и скорее всего является ошибочным. Пожалуйста, проверьте правильность ввода всех данных'
          );
          return;
        }

        let baseInfoByRegNum = response[0];
        let addressByRegNum = response[1];
        let jurNamesByRegNum = response[2];
        let VEDByRegNum = response[3];
        let IPFIOByRegNum = response[4];

        company._type = baseInfoByRegNum[0].nsi00211.nkvob;

        // 1 - Юр. лицо ; 2 - ИП
        if (company._type === 1) {
          company.info = this.mappingJurNames(jurNamesByRegNum[0]);
        } else {
          company.info = this.mappingIPFIOByRegNum(IPFIOByRegNum[0]);
        }

        company.juridicalAddress = this.mappingJurAddress(addressByRegNum[0]);
        company.ved = VEDByRegNum[0];
        company.info.unp = UNP;

        this.companyService.setCompany(company);
        return company;
      },
      error: (error) => {
        switch (error.status) {
          case 400: {
            this._notification.error(
              'Плохой запрос, проверьте вводимые данные',
              'Плохой запрос'
            );
            break;
          }
          default: {
            this._notification.error(error.error.message, error.error.error);
            break;
          }
        }

        return null;
      },
    });

    return company;
  }

  private mappingJurAddress(data: any): CompanyAddress {
    let juridicalAddress = new CompanyAddress();

    juridicalAddress.city = data.vnp;
    juridicalAddress.cityType = data.nsi00239.vntnpk;
    juridicalAddress.country = data.nsi00201.vnstranp;
    juridicalAddress.houseNumber = data.vdom;
    juridicalAddress.office = data.vpom;
    juridicalAddress.officeType = data.nsi00227?.vntpomk || null;
    juridicalAddress.street = data.vulitsa;
    juridicalAddress.streetType = data.nsi00226.vntulk;
    juridicalAddress.zipCode = data.nindex;
    juridicalAddress.phone = data.vtels?.replace(/\s/g, '') || null;
    juridicalAddress.email = data.vemail;
    juridicalAddress.fax = data.vfax;
    juridicalAddress.vnsfull = data.nsi00202.vnsfull;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): CompanyInfo {
    let info = new CompanyInfo();

    info.fullName = data.vnaim;
    info.shortName = data.vn;
    info.name = data.vfn;

    info.fullNameBel = data.vnaimb;
    info.shortNameBel = data.vnb;
    info.nameBel = data.vfnb;

    info.registrationDate = data.dcrta;

    return info;
  }

  private mappingIPFIOByRegNum(data: any): CompanyInfo {
    let info = new CompanyInfo();

    info.fullName = 'Индивидуальный предприниматель ' + data.vfio;
    info.shortName = 'ИП ' + data.vfio;
    info.name = 'ИП ' + data.vfio;

    info.fullNameBel = 'Iндывідуальны прадпрымальнік ' + data.vfio;
    info.shortNameBel = 'IП ' + data.vfio;
    info.nameBel = 'IП ' + data.vfio;

    info.registrationDate = data.dcrta;
    info.unp = data.ngrn;

    return info;
  }
}
