import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL_CONFIG } from './../config';
import { isUndefined } from 'util';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
/**
 * Class injectable for retrieving the property list,unit list,leases list, and details for the logged landlord
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(public http: HttpClient, public routes: ActivatedRoute, public route: Router ) {}

  getPropertiesList(landlordId, companyId) {
    console.log(
      BASE_URL_CONFIG +
        'property/list?companyId=' +
        companyId +
        '&landlordId=' +
        landlordId
    );
    return this.http
      .get(
        BASE_URL_CONFIG +
          'property/list?companyId=' +
          companyId +
          '&landlordId=' +
          landlordId
      )
      .pipe(map(results => results));
  }
  getPropertyDetails(id) {
    return this.http
      .get(BASE_URL_CONFIG + 'property/load/' + id)
      .pipe(map(res => res));
  }
  getUnits(propertId, landlordId) {
    return this.http
      .get(
        BASE_URL_CONFIG +
          'propertyunit/list?propertyId=' +
          propertId +
          '&landlordId=' +
          landlordId
      )
      .pipe(map(res => res));
  }

  getUnitDetails(unitId, landlordId) {
    return this.http
      .get(BASE_URL_CONFIG + 'propertyunit/load/' + unitId)
      .pipe(map(res => res));
  }
  getLeases(companyId, propertyId) {
    return this.http
      .get(
        BASE_URL_CONFIG +
          'lease/list?propertyId=' +
          propertyId + '&companyId=' + companyId
      )
      .pipe(map(res => res));
  }
  getAgedAnalysis(propertyId) {
    return this.http
      .get(BASE_URL_CONFIG + 'agedanalysis/list?propertyId=' + propertyId)
      .pipe(map(res => res));
  }
  getLeaseDetails(_id) {
    return this.http.get(BASE_URL_CONFIG + 'lease/load/' + _id)
          .pipe(map(data => data));
  }
  isUndefinedOrNull(val) {
    // will handle varius cases of undefined/null instances in a response data
    return isUndefined(val) || val == null;
  }
  goToPropertyList() {
    // will handle the back button for leases,units,details, and statements view
    this.route.navigate(['properties']);
  }
}
