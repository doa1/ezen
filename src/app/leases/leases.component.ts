import { isUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-leases',
  templateUrl: './leases.component.html',
  styleUrls: ['./leases.component.css']
})
export class LeasesComponent implements OnInit, OnDestroy {
/** Component class to rettrieve the leases associated with a given property */

  public leasesNum = 0 ;
  public leases: any = [];
  public items: any = [];
  public pageOptions = [5, 10, 20];
  public tenantNames = '';
  public leaseDetails: any = [];
  propertyName = '';
  leaseStartDate = '';
  isDataAvailable = false; // a flag to determine whether or not to display a table
  // datatables settings
  dtOptions: DataTables.Settings = {}; // notice we didn't have to import this DataTable to
    // interface with the settings, angular can find it from the modules

  dtTrigger: Subject<any> = new Subject();
  constructor( public propertyS: PropertyService,
    public authUser: AuthService, public router: ActivatedRoute, public route: Router) { }

  ngOnInit() {
    // configure the datatable
    this.dtOptions = {
      pagingType: 'full_numbers', pageLength: 5
    };
    const company = this.authUser.getLogDetails().company;
    const property = this.router.snapshot.params['id']; // get the property id passed to the url
    if (company && property) {
      this.getPropLeases(company, property);
    }
    // i need the property name, must load the property details
    let details: any = [];
    this.propertyS.getPropertyDetails(property).subscribe(
      result => {
        details = result;
        this.propertyName = details.name;
      },
      error => {
        console.log('Error getting the details');
        // render the 404 error
        this.route.navigate(['**']);
      }
    );
  }

  getPropLeases(company, property) {
    return this.propertyS.getLeases(company, property).subscribe(res => {
        this.items = res;
        this.leases = this.items.list;
        this.leasesNum = this.items.count;
        if (this.leasesNum > 0) {
          this.isDataAvailable = true;
        }
        // manual dt trigger
      this.dtTrigger.next();
    },
      error => {
      console.log(`Error getting property leases`);
        this.dtTrigger.next();
            });
    }

  getLeaseClick(item) {
    console.log(item.id);
    const id = item.id;
    let details: any = [];
    const lname = isUndefined(item.lastName) ? '' : item.lastName;
    const surname = isUndefined(item.surname) ? '' : item.surname;
    this.tenantNames  = lname + ' ' + surname;
    console.log(lname);
    // before i can populate the array with lease content, i ensure no data exists
    this.leaseDetails.length = 0; // alternatively  this could do this.leaseDetails.splice(0,this.leaseDetails.length)
    if (id) {
      this.propertyS.getLeaseDetails(id).subscribe(res => {
        details = res;
        this.leaseDetails.push( details);
        console.log(details);
        console.log(this.leaseDetails);
        // i noticed the returned date in some cases is in epoch time format, making it human..
        let mydate;
        if (this.leaseDetails.length > 0) {
          this.leaseDetails.forEach(element => {
            mydate = element.startDate;
            const check_instance = mydate instanceof Date;
            if (check_instance) {
              // we dont need to convert it
              this.leaseStartDate = mydate;
            } else {
                const convertedD = new Date(mydate * 1);
                this.leaseStartDate = convertedD.toDateString();
            }
          });
      }
      },
        error => { console.log(error); });
    }

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
