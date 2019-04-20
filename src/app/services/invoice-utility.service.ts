import { Injectable } from '@angular/core';
import 'jspdf-autotable';
declare let jsPDF: any;
import * as logoFile from './logo.js';
import * as Moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class InvoiceUtilityService {
  today = new Date();
  constructor() { }
  some_Data() {
    const logo = logoFile;
    const comapnyJSON = {
      CompanyName: 'EZEN FINANCIALS COOPERATION',
      CompanyAddressLine1: 'Twiga Towers, Muranga Road - Nairobi Kenya',
      Website: 'www.ezenfinancials.com',
      companyEmail: 'info@ezenfinancials.com',
      companyPhno: '(+254) 720 893 752 ',
      companyPhno2: '+254) 724 861 780',
    };

    const billing_info = {
      CustomerName: 'Jino Shaji',
      CustomerGSTIN: '37B76C238B7E1Z5',
      CustomerState: 'KERALA (09)',
      CustomerPAN: 'B76C238B7E',
      CustomerAddressLine1: 'ABCDEFGD HOUSE,IX/642-D',
      CustomerAddressLine2: 'ABCDEFGD P.O., NEDUMBASSERY',
      CustomerAddressLine3: 'COCHIN',
      PIN: '683584',
      CustomerEmail: 'abcd@gmail.com',
      CustomerPhno: '+918189457845',
    };


    const customer_ShippingInfoJSON = {
      CustomerName: 'Jino Shaji',
      CustomerGSTIN: '37B76C238B7E1Z5',
      CustomerState: 'KERALA (09)',
      CustomerPAN: 'B76C238B7E',
      CustomerAddressLine1: 'ABCDEFGD HOUSE,IX/642-D',
      CustomerAddressLine2: 'ABCDEFGD P.O., NEDUMBASSERY',
      CustomerAddressLine3: 'COCHIN',
      PIN: '683584',
      CustomerEmail: 'abcd@gmail.com',
      CustomerPhno: '+918189457845',
    };


    const invoiceJSON = {
      InvoiceNo: 'INV-120152',
      InvoiceDate: '03-12-2017',
      RefNo: 'REF-78445',
      TotalAmnt: 'Rs.1,24,200',
      SubTotalAmnt: 'Rs.1,04,200',
      TotalGST: 'Rs.2,0000',
      TotalCGST: 'Rs.1,0000',
      TotalSGST: 'Rs.1,0000',
      TotalIGST: 'Rs.0',
      TotalCESS: 'Rs.0',
    };
    return {'companyJson': comapnyJSON, 'billing_info': billing_info,
            'shipping_info': customer_ShippingInfoJSON, 'invoice_info': invoiceJSON,
            'logo': logo
          };
  }
  getFonts() {
   const fontSizes = { HeadTitleFontSize: 18,
      Head2TitleFontSize: 16,
      TitleFontSize: 14,
      SubTitleFontSize: 12,
      NormalFontSize: 10,
      SmallFontSize: 8
  };
  const spacing = { NormalSpacing: 12};
  return {'fonts': fontSizes, 'spacing': spacing};
  }
  getColumns() {
    const  columns = [
      {title: 'ID', dataKey: 'id', width: 90},
      {title: 'Product', dataKey: 'Product',  width: 40},
      {title: 'Rate/Item', dataKey: 'Rate/Item',  width: 40},
      {title: 'Qty', dataKey: 'Qty', width: 40},
      {title: 'Dsnt', dataKey: 'Dsnt', width: 40},
      {title: 'S.Total', dataKey: 'STotal', width: 40},
      {title: 'CGST', dataKey: 'CGST', width: 40},
      {title: 'SGST', dataKey: 'SGST', width: 40},
      {title: 'IGST', dataKey: 'IGST', width: 40},
      {title: 'CESS', dataKey: 'CESS', width: 40},
      {title: 'Total', dataKey: 'Total', width: 40}];
    return columns;
  }
  getrows() {
    const rows =
      [ {'id': 1, 'Product': 'SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040', 'Rate/Item': '10',
        'Qty' : '12', 'Dsnt': '0', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 2, 'Product': 'SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '0', 'STotal': '120', 'CGST': 20,
        'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 3, 'Product': 'SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20,
        'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20,
        'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20,
        'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': 4, 'Product': 'Shaw', 'Rate/Item': '10', 'Qty' : '12', 'Dsnt': '10', 'STotal': '120', 'CGST': 20, 'SGST': 20, 'IGST': 0, 'CESS': 20, 'Total': 180},
      {'id': '', 'Product': '', 'Rate/Item': 'Total', 'Qty' : '', 'Dsnt': '20', 'STotal': '360', 'CGST': 60, 'SGST': 60, 'IGST': 0, 'CESS': 60, 'Total': 680},

  ];
    return rows;
  }
  generate_customInvoice(columns: any [], rows: any[], propdetails: any[], summary: any[], filename: string) {
    const doc = new jsPDF('p', 'pt');
    const rightStartCol1 = 400;
    const rightStartCol2 = 480;
    const InitialstartX = 40;
    const startX = 40;
    const InitialstartY = 50;
    let startY = 0;
    const lineHeights = 12;
    doc.setFontSize(this.getFonts().fonts.SubTitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');
    doc.addImage(this.some_Data().logo.logoBase64, 'PNG', startX, startY += 50, 80, 50);
    doc.text(startX, startY += 60, this.some_Data().companyJson.CompanyName, {align: 'left'});
    doc.setFontSize(this.getFonts().fonts.NormalFontSize);

    doc.setFontType('bold');
    doc.text(startX, startY += this.getFonts().spacing.NormalSpacing, 'Address/Location: ', {align: 'left'}, );
    doc.setFontType('normal');
    doc.text( 120, startY, this.some_Data().companyJson.CompanyAddressLine1, {align: 'left'});

    doc.setFontType('bold');
    doc.text(startX, startY += this.getFonts().spacing.NormalSpacing, 'Website: ', {align: 'left'}, );
    doc.setFontType('normal');
    doc.text( 80, startY, this.some_Data().companyJson.Website, {align: 'left'});

    doc.setFontType('bold');
    doc.text( startX, startY += this.getFonts().spacing.NormalSpacing, 'EMAIL', {align: 'left'} );
    doc.setFontType('normal');
    doc.text( 80, startY, this.some_Data().companyJson.companyEmail, {align: 'left'});

    doc.setFontType('bold');
    doc.text(startX, startY += this.getFonts().spacing.NormalSpacing, 'Phone: ', {align: 'left'}, );
    doc.setFontType('normal');
    doc.text(80, startY, this.some_Data().companyJson.companyPhno, {align: 'left'});

    let tempY = InitialstartY;
    doc.setFontType('bold');
    doc.text( rightStartCol1, tempY += this.getFonts().spacing.NormalSpacing, 'PRINTED DATE: ', {align: 'left'} );
    doc.setFontType('normal');
    doc.text( rightStartCol2, tempY, new Date().toDateString(), {align: 'left'}, );

    doc.setFontType('bold');
    doc.text(  rightStartCol1, tempY += this.getFonts().spacing.NormalSpacing, 'Total Amount Due:', {align: 'left'});
    doc.setFontType('normal');
    doc.text(rightStartCol2 + 3, tempY, 'Ksh. ' + summary[0].netDue + '.00', {align: 'left'});

    doc.setFontType('normal');

    doc.setLineWidth(1);
    // doc.line(20, startY+this.getFonts().spacing.NormalSpacing, 580, startY+=this.getFonts().spacing.NormalSpacing);
    doc.line(20, startY + this.getFonts().spacing.NormalSpacing, 150, startY + this.getFonts().spacing.NormalSpacing);
    doc.line(430, startY + this.getFonts().spacing.NormalSpacing, 580, startY + this.getFonts().spacing.NormalSpacing);

    doc.setFontSize(this.getFonts().fonts.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.text( startX + 250, startY += this.getFonts().spacing.NormalSpacing + 2, 'PROPERTY ACCOUNT STATEMENT', {align: 'center'});

    doc.setFontSize(this.getFonts().fonts.NormalFontSize);

    doc.setFontType('bold');
    // -------Customer Info Billing---------------------
    const startBilling = startY;

    doc.text( startX, startY += this.getFonts().spacing.NormalSpacing, 'PROPERTY: ', {align: 'left'}, );

    doc.setFontType('normal');
    doc.text(120, startY, propdetails[0].name + ', ' + propdetails[0].code, {align: 'left'});
    doc.text(startX, startY += this.getFonts().spacing.NormalSpacing, '', {align: 'left'}, );
    doc.setFontType('bold');
    doc.setFontSize(this.getFonts().fonts.NormalFontSize);
    doc.text( startX, startY += this.getFonts().spacing.NormalSpacing, 'LR NO/ESTATE: ', {align: 'left'});
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(120, startY, propdetails[0].lrNumber, {align: 'left'});

    doc.setFontType('bold');
    doc.text( startX, startY += this.getFonts().spacing.NormalSpacing, 'PAYMENT PERIOD: ', {align: 'left'});
    doc.setFontType('normal');
    const d = Moment(this.today, 'MMM-DD-YYY').format('MMMM-Y');
    doc.text(140, startY, d , {align: 'left'}, );
    // -------Customer Info Shipping---------------------
    const rightcol1 = 340;
    const rightcol2 = 400;

    startY = startBilling;
    doc.setFontType('bold');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'PRINCIPLE: ', {align: 'left'});
    // WILL PUT LANDLORD NAME
    doc.setFontType('normal');
    doc.text(rightcol2, startY, propdetails[0].code.slice(0, propdetails[0].code.length - 1), {align: 'left'}, );
    doc.text( rightcol2, startY += this.getFonts().spacing.NormalSpacing, '', {align: 'left'}, );
    doc.text(rightcol2, startY += this.getFonts().spacing.NormalSpacing, propdetails[0].landlord, {align: 'left'}, );

    doc.setFontSize(this.getFonts().fonts.NormalFontSize);
    doc.setFontType('bold');
    const df = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const dm = Moment(df).format('M-D-Y');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'DUE DATE:', {align: 'left'});
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2, startY, dm, {align: 'left'}, );

    doc.setFontType('bold');
    doc.text('STATE', {align: 'left'}, rightcol1, startY += this.getFonts().spacing.NormalSpacing);
    doc.setFontType('normal');
    doc.text(this.some_Data().billing_info.CustomerState, {align: 'left'}, rightcol2, startY);

    doc.setFontType('bold');
    doc.text('PIN', {align: 'left'}, rightcol1, startY += this.getFonts().spacing.NormalSpacing);
    doc.setFontType('normal');
    doc.text(this.some_Data().billing_info.PIN, {align: 'left'}, rightcol2, startY);

    doc.setFontType('bold');
    doc.text('EMAIL', {align: 'left'}, rightcol1, startY += this.getFonts().spacing.NormalSpacing);
    doc.setFontType('normal');
    doc.text(this.some_Data().billing_info.CustomerEmail, {align: 'left'}, rightcol2, startY);

    doc.setFontType('bold');
    doc.text('Phone: ', {align: 'left'}, rightcol1, startY += this.getFonts().spacing.NormalSpacing);
    doc.setFontType('normal');
    doc.text(this.some_Data().billing_info.CustomerPhno, {align: 'left'}, rightcol2, startY);
    const header = function (data) {
      doc.setFontSize(8);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
    };
    // @ts-ignore
    // @ts-ignore
    // noinspection TypeScriptUnresolvedVariable
    doc.setFontSize(8);
    doc.setFontStyle('normal');
    const options = {
      addPageContent: header,
      margin: {
        top: 10
      },
      styles: {
        overflow: 'linebreak',
        fontSize: 8,
        cellPadding: 18,
        columnWidth: 'wrap'
      },
      columnStyles: {
        1: {columnWidth: 'auto'},
        2: {columnWidth: 'auto'},
        3: {columnWidth: 'auto'},
        4: {columnWidth: 'auto'},
        5: {columnWidth: 'auto'},
        6: {columnWidth: 'auto'},
      },
      startY: startY += 10
    };
    doc.autoTable(columns, rows, options);
    // -------Invoice Footer---------------------
    // const rightcol1 = 340;
    // const rightcol2 = 430;

    startY = doc.autoTableEndPosY() + 30;
    doc.setFontSize(this.getFonts().fonts.NormalFontSize);
    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Rent Received: ', {align: 'left'}, );
    doc.text( rightcol2 + 60, startY, '' + summary[0].rentReceived + '.00', {align: 'left'}, );
    doc.setFontSize(this.getFonts().fonts.NormalFontSize);
    doc.setFontType('normal');
    doc.text(rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Less Mgmt Fees (0%): ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY, '' + summary[0].fees + '.00', {align: 'left'}, );


    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'VAT (16%): ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY, '' + summary[0].vat + '.00', {align: 'left'}, );

    doc.setFontType('bold');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Total Amount Due: ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY, '' + summary[0].totalDue + '.00', {align: 'left'}, );
    doc.text(rightcol2 + 60, startY,  '', {align: 'left'}, ); // empty line
    // horizintal divider
    doc.setLineWidth(1);
    doc.line(335, startY + this.getFonts().spacing.NormalSpacing - 10, 490, startY += this.getFonts().spacing.NormalSpacing - 10);

    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Less Advances: ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY,  summary[0].advances + '.00', {align: 'left'}, );

    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Less Other Transactions', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text( rightcol2 + 60, startY, summary[0].less_transc + '.00', {align: 'left'}, );


    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'Add Other Transactions: ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY, summary[0].other_transc + '.00', {align: 'left'}, );
    doc.text(rightcol2 + 60, startY,  '', {align: 'left'}, ); // empty line
    // horizintal divider
    doc.setLineWidth(1);
    doc.line(335, startY + this.getFonts().spacing.NormalSpacing - 10, 490, startY += this.getFonts().spacing.NormalSpacing - 10);

    doc.setFontType('normal');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'BALANCE B/F: ', {align: 'left'}, );
    doc.setFontType('bold');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY, summary[0].bal_bf + '.00', {align: 'left'}, );
    doc.text(rightcol2 + 60, startY, '', {align: 'left'}, );
    // some horizontal dividers
    doc.setLineWidth(1);
    // doc.line(20, startY+this.getFonts().spacing.NormalSpacing, 580, startY+=this.getFonts().spacing.NormalSpacing);
   // doc.line(20, startY + this.getFonts().spacing.NormalSpacing, 150, startY + this.getFonts().spacing.NormalSpacing);
    doc.line(320, startY + this.getFonts().spacing.NormalSpacing - 10, 500, startY + this.getFonts().spacing.NormalSpacing - 10);
    doc.text(rightcol2 + 60, startY, '', {align: 'left'}, );

    doc.setFontType('bold');
    doc.text( rightcol1, startY += this.getFonts().spacing.NormalSpacing, 'NET AMOUNT DUE: ', {align: 'left'}, );
    doc.setFontType('normal');
    // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.text(rightcol2 + 60, startY,  summary[0].netDue + '.00', {align: 'left'}, );
    doc.setFontType('bold');
    doc.text( rightcol2 + 30, startY += this.getFonts().spacing.NormalSpacing + 50, 'For ' + this.some_Data().companyJson.CompanyName + ',', {align: 'center'});
    doc.text( rightcol2 + 30, startY += this.getFonts().spacing.NormalSpacing + 50, 'Authorised Signatory', {align: 'center'});

    doc.save(filename + '_' + Moment(this.today).format('MM-DD-Y') + '_.pdf');
  }
}
