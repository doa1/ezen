/**Class to render the data of paid statements
 *  trigger the Datatables manually to ensure it inits when the page/data is ready
 */
import { PropertyService } from '../services/property.service';
import { RentsService } from '../services/rents.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit, OnDestroy {
  public paidBalances: any = [];
  propertyName = '';
  dtOptions: DataTables.Settings = {};
  userHasStatements = false;
  // We use this trigger because fetching the list of statements can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(private authS: AuthService, private rentS: RentsService,
     private route: Router, private active_router: ActivatedRoute, public propService: PropertyService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 5,
      pagingType: 'full_numbers'
    };
    const company = this.authS.getLogDetails().company;
    const property = this.active_router.snapshot.params['id'];
    this.getPaidStmts(company, property);
    let details: any;
    this.propService.getPropertyDetails(property).subscribe(data => {
      details = data;
      this.propertyName = details.name;
    },
      error => {console.log(error); });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getPaidStmts(company, property) {
      this.rentS.getPaidBalance(company, property).subscribe(result => {
        this.paidBalances = result;
        console.log(result);
         // Calling the DT trigger to manually render the table, but not before we know there is data to render
        if (this.paidBalances.length > 0) {
          this.userHasStatements = true;
        }
        this.dtTrigger.next();
      },
        error => {
          console.log(error);
          this.route.navigate(['**']); // render the 404
        });
  }

}
