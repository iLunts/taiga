import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http/ngx';
// import { Platform } from '@ionic/angular';
import { forkJoin, from, Observable } from 'rxjs';
import {
  Contractor,
  ContractorInfo,
  ContractorAddress,
} from '../models/contractor.model';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  constructor(
    private _http: HttpClient // private _httpNative: HTTP,
  ) {}

  getBaseInfoByRegNum(UNP: string): any {
    return from(this._http.get(`/api/v2/egr/getBaseInfoByRegNum/${UNP}`));
  }

  getAddressByRegNum(UNP: string): any {
    return from(this._http.get(`/api/v2/egr/getAddressByRegNum/${UNP}`));
  }

  getJurNamesByRegNum(UNP: string): any {
    return from(this._http.get(`/api/v2/egr/getJurNamesByRegNum/${UNP}`));
  }

  getVEDByRegNum(UNP: string): any {
    return from(this._http.get(`/api/v2/egr/getVEDByRegNum/${UNP}`));
  }

  getIPFIOByRegNum(UNP: string): any {
    return from(this._http.get(`/api/v2/egr/getIPFIOByRegNum/${UNP}`));
  }

  getAllByUnp(UNP: string): Contractor {
    let tempContractor: Contractor = new Contractor();

    const observable = forkJoin([
      this.getBaseInfoByRegNum(UNP),
      this.getAddressByRegNum(UNP),
      this.getJurNamesByRegNum(UNP),
      this.getVEDByRegNum(UNP),
      this.getIPFIOByRegNum(UNP),
    ]);

    observable.subscribe({
      next: (response) => {
        let baseInfoByRegNum = response[0];
        let addressByRegNum = response[1];
        let jurNamesByRegNum = response[2];
        let VEDByRegNum = response[3];
        let IPFIOByRegNum = response[4];

        tempContractor._type = baseInfoByRegNum[0].nsi00211.nkvob;
        tempContractor.info.unp = UNP;

        // 1 - Юр. лицо ; 2 - ИП
        if (tempContractor._type === 1) {
          tempContractor.info = this.mappingJurNames(jurNamesByRegNum[0]);
        } else {
          tempContractor.info = this.mappingIPFIOByRegNum(IPFIOByRegNum[0]);
        }

        tempContractor.juridicalAddress = this.mappingJurAddress(addressByRegNum[0]);
        tempContractor.ved = VEDByRegNum[0];
      }
    });

    return tempContractor;
  }

  private mappingJurAddress(data: any): ContractorAddress {
    let juridicalAddress = new ContractorAddress();

    juridicalAddress.city = data.vnp;
    juridicalAddress.cityType = data.nsi00239.vntnpk;
    juridicalAddress.country = data.nsi00201.vnstranp;
    juridicalAddress.houseNumber = data.vdom;
    juridicalAddress.office = data.vpom;
    juridicalAddress.officeType = data.nsi00227.vntpomk;
    juridicalAddress.street = data.vulitsa;
    juridicalAddress.streetType = data.nsi00226.vntulk;
    juridicalAddress.zipCode = data.nindex;
    juridicalAddress.phone = data.vtels?.replace(/\s/g, '') || null;
    juridicalAddress.email = data.vemail;
    juridicalAddress.fax = data.vfax;
    juridicalAddress.vnsfull = data.nsi00202.vnsfull;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): ContractorInfo {
    let info = new ContractorInfo();

    info.fullName = data.vnaim;
    info.shortName = data.vn;
    info.name = data.vfn;

    info.fullNameBel = data.vnaimb;
    info.shortNameBel = data.vnb;
    info.nameBel = data.vfnb;

    info.registrationDate = data.dcrta;

    return info;
  }

  private mappingIPFIOByRegNum(data: any): ContractorInfo {
    let info = new ContractorInfo();

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
