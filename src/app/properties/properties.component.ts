import { DataExportsService } from '../services/data-exports.service';
import { Subject } from 'rxjs';
import { PropertyService } from '../services/property.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, OnDestroy {
  /*Class responsible for rendering of properties belonging to the logged landlord, as well handle data exportation and navigation
  *of the actions available per property like viewing details,units,leases/statements etc
  * */
  title = 'Properties List ';
  limits = [5, 10, 20, 30, 40];
  // declare the table header list for  export actions of the properties list
  columns = ['Property Name', 'Code', 'Category', 'LR Number', 'Region/Zone',
  'Address/Location', 'Vacant', 'Occupied', 'Total Units', 'Account Model Level',
  'Building Type', 'Floors'];
  itemCount = 0;
  items: any = [] ;  /*itemResource = new DataTableResource(this.properties); */
  myprops = []; // Properties[0].list;
  mycount = 0; // Properties[0].count;
  // some settings for the table
  selectedRow = '';
  dtOptions: any = {};
  today = new Date();
  // since we'll the datatable library for table display,it's a good idea to ensure the datatable is only fired when the properties list
  // has fully loaded, i.e when the component has fully loaded
  dtTrigger: Subject<any> = new Subject();
  // we don't need to render the table in case the user has no properties listed
  userHasData = false;
  constructor(public auth: AuthService, public exportService: DataExportsService, public propService: PropertyService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 5, pagingType: 'full_numbers',
       // Declare the use of the extension in the dom parameter
    };
    this.allProperties(this.auth.getLogDetails().landlordId, this.auth.getLogDetails().company);
  }
  ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
  }
  allProperties(landlodId, companyId) {
      this.propService.getPropertiesList(landlodId, companyId).subscribe(res => {
        this.items = res;
        this.myprops = this.items.list;
        this.mycount = this.items.count;
        if (this.mycount > 0) {
          this.userHasData = true;
;        }
        this.dtTrigger.next();
      }, error => {console.error(error); }
      );
  }

  exportAsXL(): void {
    // create an array of data to export as pdf
    const properties: any = [];
    console.log(this.myprops);
    if (this.myprops.length > 0) {
      // this.myprops.forEach(item => {

        for (let index = 0; index < this.myprops.length; index++) {
          const item = this.myprops[index];
          const totalUnits = item.vacUnits + item.occUnits;
          const title = `${this.auth.getLogDetails().username} properties list as at ${this.today.toDateString()}`;
        properties.push(
                [ item.name, item.code, item.category, item.lrNumber, item.regionName,
                   item.address.location, item.vacUnits, item.occUnits, totalUnits, item.accountModeLevel,
                   item.buildngTp, item.flrs], );
      } // );
      console.log('Properties ', properties);
      // this.exportService.exportAsExcelFile(properties, 'properties');
      this.exportService.generateExcel(this.title, 'Properties' , this.columns, properties, 'Properties_' + this.today.toDateString());
    }

  }
  downloadPdf(): void {
    const rows = [];
    this.myprops.forEach(item => {
      const units = item.vacUnits + item.occUnits;
     rows.push([item.name, item.code, item.category, item.lrNumber, item.regionName, item.address.location,
      item.occUnits , item.vacUnits, item.vacUnits + item.occUnits, item.flrs], );
    });
    const headers = ['Property Name', 'Code', 'Category', 'LR Number', 'Region/Zone',
    'Address/Location', 'Vacant', 'Occupied', 'Total Units', 'Floors'];
    console.log(rows);
    const myconfig = [];
    const filename = 'properties';

    this.exportService.saveFileAsPdf(headers, rows, filename);
  }
  itemClicked(item) {
    this.selectedRow = item.name.replace(/\s/g, '');
  }

}
