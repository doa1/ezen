/**
 *  Home Component that displays the dashboard,
 *  We're using the Renderer2 Core service to make the DOM available to our component
 *  We're using the ViewChild Property decorator to configure our DOM view so we can get and monitor html selector to use as our directive
 *  Our component implements the AfterViewInit callback to ensure we can access certain properties which could not load immediately with the document, in this case
 *  leases and units were loaded after getting the properties list, hence the delay.
 */
import { AuthService } from '../services/auth.service';

import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , AfterViewInit {
  @ViewChild('chartToggle') div: ElementRef;
  properties: any = {};
  proplen = 0;
  unitslen = 0;
  units: any = {};
  leases: any = {};
  leaseslen = 0;
  companyId = null;
  landlordId = null;
  propertyNames = [];
  property_ids = [];
  leasesLineChartData = []; // new Array(this.propertyNames.length).fill(0);

  leasesSample = [];

  occupancyRatioLabels: Array<any> = [ 'Occupied', 'Vacant'];
  occupancyRatioData = [0, 0];
  lineChartOptions = {label: 'leases', legend: { display: false },
   title: { display: true, text: 'Your total leases per properties(tenants)'
  } };
  // some event triggers
  isDataloaded = false;
  // init and create instances of our injectables
  constructor(
    public propertyS: PropertyService,
    public authUser: AuthService, private rd: Renderer2
  ) {}
  /* some demo for charts */
  public lineChartType = 'line';
  public pieChartType = 'pie';

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
  ngOnInit() {
    this.companyId = this.authUser.getLogDetails().company;
    this.landlordId = this.authUser.getLogDetails().landlordId;
    if (this.companyId && this.landlordId) {
      // only call these methods when the credentials are valid
      this.getProperties(this.companyId, this.landlordId);

     // this.getPropLeases(this.companyId, this.landlordId);
    } else {
      console.log('not logged in?');
    }
    console.log(this.property_ids);
  }
  ngAfterViewInit() {
    /* I'm hopping the document has loaded after 3 seconds, so i can trigger the click event on the bar/line graph chart*/
    setTimeout( () => {
      console.log(this.isDataloaded);
      if (this.isDataloaded) {
        this.div.nativeElement.click();
      }
    }, 3000);
  }
  getProperties(landId, compId) {
    return this.propertyS.getPropertiesList(compId, landId).subscribe(
      res => {
       // console.log(res);
        // console.log(compId + landId);
        this.properties = res;
        this.proplen = this.properties.count;
        let occupied = 0;
        let vacant = 0;
        // create an empty object to temporarily hold our property ids
        const ids = [];
        // only perforrm further actions if response return  properties
          if ( this.proplen > 0) {
            // this.isDataloaded = true;
          this.properties.list.forEach(data => {
            //  in order to extract leases and units related to each property we need the id
           // console.log(data.id);
            this.propertyNames.push(data.name);
            occupied += data.occUnits;
            vacant += data.vacUnits;
            ids.push(data.id);
          });
        }
        this.property_ids = ids;
        if (this.property_ids.length > 0) {
          this.property_ids.forEach(id => {
            this.getPropLeases(this.companyId, id);
            this.leasesLineChartData = this.leasesSample;
            console.log(this.leasesLineChartData);
             this.isDataloaded = true;
          });
        }
        this.occupancyRatioData = [occupied, vacant];
       // console.log(this.occupancyRatioData);
        this.unitslen = occupied + vacant;
      },
      error => {
        console.log(error);
      }
    );
  }

  getPropLeases(company, property) {
    // console.log(`Company ${company} property ${property}`);
    return this.propertyS.getLeases(company, property).subscribe(res => {
      this.leases = res;
      this.leaseslen = this.leases.count;
      this.leasesSample.push(this.leaseslen);
    },
      error => {console.log(`Error returning leases!! ${error}`); }
      );
  }
}
