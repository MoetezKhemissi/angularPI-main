import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvestesmentService } from 'app/front/service/investesment.service';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.css']
})
export class ExportPDFComponent implements OnInit {
  constructor(private http: HttpClient, private investmentService: InvestesmentService) { }
  ngOnInit(): void { }
  
  exportPDF(): void {
    this.investmentService.exportToPDF()
      .subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}
