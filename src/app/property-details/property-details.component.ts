// import { element } from 'protractor';
import { isUndefined } from 'util';
/** Class for property details objects */
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PAYMENT_TYPES } from '../config';
import { RentsService } from '../services/rents.service';
import { DataExportsService } from '../services/data-exports.service';
import * as Jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {InvoiceUtilityService} from '../services/invoice-utility.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  // class properties/attribs
  public propertyDetail = [];
  propertName = '';
  lrNumber = '';
  propertyCode = '';
  panelOpenState = false; // some panel expansion toggle options
  today = new Date();
  lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
  totalUnits = 0;
  payAdviceDetails: any = [];
  // globals for the payment statements
  perUnitDetails: any = [];
  clickedPayment = '';
  totalBf = 0 ;  totalRent = 0 ; totalAmtPaid = 0 ; totalBalCf = 0;
  totalInvoce = 0;
  effectiveDates: any = [];
  statementType = '';
  totalExpense = 0;
  mngmentFees: any = [];
  balanceBf = 0;
  defferedAmt = 0;
  amtDue = 0;
  periodIncome = 0;
  periodDeductions = 0;
  rentReceived = 0;
  netAmtDue = 0;
  public paymentTypes = PAYMENT_TYPES;
  constructor(
    public auth: AuthService,
    public propService: PropertyService,
    public router: ActivatedRoute,
    public route: Router,
    public report: DataExportsService,
    public rentService: RentsService,
    public invoice_report: InvoiceUtilityService
  ) {}

  ngOnInit() {
    const propertyId = this.router.snapshot.params['id'];
    this.getPropertyData(propertyId);
  }
  getPropertyData(id_) {
    let property: any = [];
    this.propService.getPropertyDetails(id_).subscribe(
      data => {
        property = data;
        this.propertyDetail.push(property);
        let occUnits = 0;
        let vacUnitw = 0;
        this.propertyDetail.forEach(elem => {
          occUnits = elem.occUnits;
          vacUnitw = elem.vacUnits;
          this.propertName = elem.name;
          this.lrNumber = elem.lrNumber;
          this.propertyCode = elem.code;
        });
        this.totalUnits = occUnits + vacUnitw;
      },
      error => {
        console.log(error);
        // will always render the 404 page in case anything goes wrong
        this.route.navigate(['**']);
      }
    );
  }
  // we need to check if certain content of the response contain null or defined values
  isUndefinedOrNull = function(val) {
    return isUndefined(val) || val === null;
  };
  getPayAdvice(payment) {
    console.log(payment);
    this.clickedPayment = payment;
    const company = this.auth.getLogDetails().company;
    const property = this.router.snapshot.params['id'];
    let details: any = [];
    // clear the arrays first
    this.perUnitDetails.length = 0;
    this.effectiveDates.length = 0;
    this.mngmentFees.length = 0;
    // AND ensure the summations are 0
    this.totalAmtPaid = 0;
    this.totalBalCf = 0;
    this.totalBf = 0;
    this.totalInvoce = 0;
    this.totalRent = 0;
    this.netAmtDue = 0;
    this.rentService.getPayAdvice(company, property, payment).subscribe(
      response => {
        details = response;
        console.log(details);
        this.payAdviceDetails = [details];
        this.payAdviceDetails.forEach(element => {
          this.amtDue = element.netAmountDue;
          this.balanceBf = element.balanceBf;
          this.defferedAmt =  element.deferredAmount;
          this.totalExpense = element.periodExpense;
          this.periodIncome = element.periodIncome;
          this.periodDeductions = element.totalDeductions;
          this.rentReceived = element.rentReceived;
          this.netAmtDue = element.netAmountDue;
          this.mngmentFees.push({'fees': element.manFees, 'rates': element.manFeesRate, 'vat': element.manFeesVat,
                                'total': (element.manFees + element.manFeesRate + element.manFeesVat)});
          // rent list is array within this array, loop through to obtain additional info
          element.rentsList.forEach(item => {
            this.perUnitDetails.push({'unitNo': item.unitNo, 'description': item.tenantName, 'amountPaid': item.amountPaid,
              'amountTax': item.amountPaidTax, 'bal_bf': item.balanceBf, 'bal_cf': item.balanceCf,
              'invoice': item.invoiced, 'charges': item.monthlyCharge
            }, );
            this.totalBf += item.balanceBf;
            this.totalAmtPaid += item.amountPaid;
            this.totalBalCf += item.balanceCf;
            this.totalRent += item.monthlyCharge;
            this.totalInvoce += item.invoiced;

          });
          this.statementType = element.statementType;
          this.effectiveDates.push({'from': new Date(element.withEffectFrom).toDateString(),
           'to': new Date(element.withEffectTo).toDateString() });
        });
        console.log('perunit ', this.perUnitDetails);
      },
      error => {}
    );
  }
  getPdfInvoice() {
    /* a working soln with jspdf and the html2canvas library but inefiecient since it relies on the html table layout and
    stylings to capture the image n store image as pdf
    * */
    // grab the table data and convert into image, save the image as pdf doc
    const data = document.getElementById('invoice');
    console.log(data);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgW = 205;
      const pageH = 295;
      const imgH = canvas.height * imgW / canvas.width;
      const heightLeft = imgH ;
      const contntDataUrl = canvas.toDataURL('image/png');
      const pdf = new Jspdf('p', 'mm', 'a4');
      const postn = 0;
      pdf.addImage(contntDataUrl, 'PNG', 0, postn, imgW, imgH );
      pdf.save(this.propertName + ' PAY_ADVICE ' + this.today.toDateString() + '.pdf');

    });
  }
  downloadInvoiceAdvice() {
    //  a working solution with jsPDF library and autotable library
    const propdetails = [
                        {'name': this.propertName, 'code': this.propertyCode, 'lrNumber': this.lrNumber, 'landlord': this.auth.getLogDetails().username}
                        ];
    const columns = [
      {title: 'Unit No#', dataKey: 'unitNo', width: 90},
      {title: 'Description', dataKey: 'description',  width: 40},
      {title: 'Rent', dataKey: 'charges',  width: 40},
      {title: 'Invoiced', dataKey: 'invoice', width: 40},
      {title: 'Balance B/f', dataKey: 'bal_bf', width: 40},
      {title: 'Amount Paid', dataKey: 'amountPaid', width: 40},
      {title: 'Balance C/f', dataKey: 'bal_cf', width: 40}];
    const rows = this.perUnitDetails;
    rows.push([]); // creates and empty row before adding the totals row
    rows.push({'description': 'TOTAL', 'amountPaid' : this.totalAmtPaid, 'bal_bf': this.balanceBf,
      'invoice': this.totalInvoce, 'bal_cf': this.totalBalCf, 'charges': this.totalRent});
    const filename = this.propertName + '_' + this.clickedPayment + '_PAY_ADVICE';
    const totals_summary = [
      {'rentReceived': this.rentReceived, 'fees': this.mngmentFees[0].fees, 'vat': this.mngmentFees[0].vat,
      'totalDue': this.amtDue, 'advances': 0, 'less_transc': 0, 'other_transc': 0,
        'add_transc': 0, 'bal_bf': this.balanceBf, 'netDue': this.netAmtDue}
    ];
    this.invoice_report.generate_customInvoice(columns, rows, propdetails, totals_summary, filename);
  }
}
