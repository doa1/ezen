import { count } from 'rxjs/operators';
import {Component, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { PropertyService } from '../services/property.service';
import { AuthService } from '../services/auth.service';
import {Routes, ActivatedRoute} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements  OnInit, OnDestroy {

  constructor(public auth: AuthService, public propService: PropertyService, public activeRoute: ActivatedRoute ) { }
  propUnits: any = [];
  dataSource: any = [];
  itemsCount = 0;
  dataTableOptions: DataTables.Settings = {};
  // some manual trigger if necessary
  dtTriger: Subject<any> = new Subject<any>();
  unitDetails = [];
  unitNo = '';
  propertyName = '';
  userHasUnits = false;
  ngOnInit() {
    // apply dt settings
    this.dataTableOptions = {
      pageLength: 5, pagingType: 'full_numbers', lengthChange: true,
       };
     const propId = this.activeRoute.snapshot.params['id'];
     const landlordID = this.auth.getLogDetails().landlordId;
     this.getPropertyUnits(propId, landlordID);

     // get property name to display
     let propData: any = [];
     this.propService.getPropertyDetails(propId).subscribe(res => {
      propData = res;
      this.propertyName = propData.name;
     });

  }
  getPropertyUnits( propertId, landlordID) {
    this.propService.getUnits(propertId, landlordID).subscribe( data => {
      console.log(data);
      this.propUnits = data;
      this.itemsCount = this.propUnits.count;
      if (this.itemsCount > 0) {
        this.userHasUnits = true;
      }
      // trigger the table manually now
      this.dtTriger.next();
    },
      error => { console.log(error); });
  }
  // Add some data filtering mechanisms here!
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getUnitDetails(unit) {
      const id = unit.id;
      let details: any = [];
      // reset the array holding the unit details
      this.unitDetails.length = 0;
      this.propService.getUnitDetails(id, this.auth.getLogDetails().landlordId).
      subscribe(result => {
        console.log('result ' , result);
        details = result;
        this.unitDetails.push(details);
        this.unitDetails.forEach(i => {
          this.unitNo = i.unitNo;
        });
      },
      error => {console.error(error); });

  }
  // unsubscribe the triggered data
  ngOnDestroy(): void {
    this.dtTriger.unsubscribe();
  }
}
