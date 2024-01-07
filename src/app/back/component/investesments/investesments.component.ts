import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Investesment } from 'app/front/class/investesment';
import { InvestesmentService } from 'app/front/service/investesment.service';
import { ExportPDFComponent } from '../export-pdf/export-pdf.component';




@Component({
  selector: 'app-investesments',
  templateUrl: './investesments.component.html',
  styleUrls: ['./investesments.component.css']
})
export class InvestesmentsComponent implements OnInit {

  @ViewChild('amountChart', { static: false }) amountChart: ElementRef;
  @ViewChild('finalChart', { static: false }) finalChart: ElementRef;
  @ViewChild('tauxChart', { static: false }) tauxChart: ElementRef;

  constructor(private service:InvestesmentService) { }
  investesments:Investesment[];
  private exportPDFComponent: ExportPDFComponent
  ngOnInit(): void {
    this.service.getinvestements().subscribe((data:any[])=>{
      this.investesments=data;
    })
  }
  exportToPDF() {
    this.service.exportToPDF();
  }


 
}