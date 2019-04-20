import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as PDFMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Workbook} from 'exceljs';
// import * as FluentReport from 'fluentreports';
// import * as PDF from 'jspdf';
import 'jspdf-autotable';
declare let jsPDF: any;
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as logoFile from './logo.js';

@Injectable({
  providedIn: 'root'
})
export class DataExportsService {

  constructor() { }
  public  exportAsExcelFile(json: any[], excelFileName: string): void {
      const self = this;
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,{ cellStyles: true});
      this.wrapAndCenterCell(worksheet.A1);
      const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};

      const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
       this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  private saveAsExcelFile(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, filename + '_export_' + new Date().toDateString() + EXCEL_EXTENSION);
  }
  private wrapAndCenterCell(cell: XLSX.CellObject) {
    const wrapAndCenterCellStyle = { alignment: { wrapText: true,  vertical: 'center', horizontal: 'center' }, margin: 20, };
    this.setCellStyle(cell, wrapAndCenterCellStyle);
}

private setCellStyle(cell: XLSX.CellObject, style: { }) {
    cell.s = style;
}
  saveFileAsPdf(columns: any, row: any, fileName: string): void {
    const doc = new jsPDF('t', 'mm', 'A3');
    doc.autoTable(columns, row);
    // doc.addImage('./assets/images/logo.png', 'PNG', 0 , 20 , 30);
    // doc.table(32, 20, data = data,  headers, configure);
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont('times', 'italic');
    // doc.text('Purchase Order Date', this.order.date, 230, 50);
    doc.text(`My Properties List as on ${new Date().toDateString()}`, 80, 10);
    doc.save(fileName);

  }
  getPdfWithPdfMaker(doc, filename) {
    // const win = window.open('', '_blank');
    const d = new Date();
    const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() ;
    PDFMake.vfs = pdfFonts.pdfMake.vfs;
    PDFMake.createPdf(doc).download(filename + '_payments_' + date + '.pdf');
  }
  generateExcel(title: string, sheet: string, header: any[], data: any[], filename: string) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheet);
    // add new row
        // get the image
    /**
     * workbook.addImage(image) creates an image object
     *  and returns the image id, that image id we will use to place image in the worksheet
     * using worksheet.addImage(imageId, cellRange).
     *
     * The coordinates calculated from the range will cover from the top-left of the first
     * cell to the bottom right of the second.
     */
    const logo = workbook.addImage({
      base64: logoFile.logoBase64, extension: 'jpeg'
    });
    worksheet.addImage(logo, 'E1:G3');
    worksheet.addRow([]);
       // MERGE CElls
    /**
     * We can merge cells using worklist.mergeCells(cellRange) method, as below,

    worksheet.mergeCells('A1:D2');
    The coordinates calculated from the range will cover from the top-left of the first cell to the bottom right of the second.
    */
    worksheet.mergeCells('A1:K3');
    // add the title row
    worksheet.addRow([]);
    const titleRow = worksheet.addRow(['', '', '', '', title]);
    // Set font, size and style in title row.
    titleRow.font = {name: 'Comic Sans MS', family: 4, bold: true,
                  size: 17, underline: 'double'};
    // create a blank row
    // worksheet.addRow([]);
    // add row with current date
    worksheet.mergeCells('E5:F5'); // merge the title cells
    worksheet.getRow(5).height = 20;

    const subtitleRow = worksheet.addRow(['', '' , '', '', 'Date generated: ' + new Date().toDateString()]);
    subtitleRow.font = { italic: true };
    worksheet.mergeCells('E6:G6'); // merge the date cells
    // Add Data with Header & Conditional Formatting

    // add header row
    const headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true};
    // cell style: fill and border
    headerRow.eachCell((cell, colnumber) => {
      cell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF00'},
          bgColor: {argb: 'FF0000FF'},
        };
      cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'} };

    });

    /**
     * ExcelJS directly doesn’t support conditional formatting,
     *  but we can achieve this functionality by assigning style based on required condition
     *  in angular, as below,
     */
    // Add Data Formating
    data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(7);
      let  color = 'FF99FF99';
      if (+qty.value < 1) {
            color = 'FF9999';
      }
      qty.fill = {
        type: 'pattern', pattern: 'solid', fgColor: {argb: color}
      };
    });
    // expanding certain columns
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(3).width = 12;
    worksheet.getColumn(6).width = 17;
    worksheet.getColumn(10).width = 20;
    worksheet.getColumn(11).width = 12;
    // add ablank row befor the footer
    worksheet.addRow([]);
    // footer Row
    const footerRow = worksheet.addRow(['This is system generated excell sheet showing the properties you own!!.']);
    footerRow.getCell(1).fill = {
      type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFCCFFE5'}
    };
    footerRow.getCell(1).border = {
      top: {style: 'thin'}, bottom: {style: 'thin'}, left: {style: 'thin'}, right: {style: 'thin'}
    };

    // merge the cells
    worksheet.mergeCells(`A${footerRow.number}:L${footerRow.number}`);
    /**
     * Now our workbook is ready to export. We can export it
     * using saveFile() method of file-saver, as shown below
     */
    workbook.xlsx.writeBuffer().then((mdata) => {
      const blob = new Blob([mdata], {type: EXCEL_TYPE});
      FileSaver.saveAs( blob, filename + EXCEL_EXTENSION);
    });
}
  /*getInvoiceStatements(data) {
    const Report = FluentReport.Report;
    const mreport = new Report('demo.pdf').data(data);

  }*/
}
