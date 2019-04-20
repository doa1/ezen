import { map } from 'rxjs/operators';
import { BASE_URL_CONFIG } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  constructor(public http: HttpClient) { }
  getPayAdvice(companyId, propertyId, payType) {
    /* Returns landlord pay advice report in JSON format.
     Company ID must be provided as URL param. Property ID must be provided as URL param.
q      <base_url>/api/propertystmt/payadvice?companyId=2113&propertyId=4147&lldPaymentType=RENT_ONLY&month=9&year=2018
     */
    return this.http.get(BASE_URL_CONFIG + 'propertystmt/payadvice?companyId=' + companyId +
    '&propertyId=' + propertyId + '&lldPaymentType=' + payType).pipe(
      map(result => result)
    );
    }
    getPaidBalance(companyId, propertyId) {
      /**Returns collection of paid & balance report of tenants in JSON format. Company ID must be provided as URL param. Either Zone Id or
       * Field officer ID or Property ID must be provided as URL param to
       * filter the records.
       * /api/propertystmt/paidbalance?companyId={companyId}&propertyId={propertyId}
       *  */
         return this.http.get(BASE_URL_CONFIG + 'propertystmt/paidbalance?companyId=' + companyId + '&propertyId=' + propertyId)
         .pipe(map(result => result));
      }

}
