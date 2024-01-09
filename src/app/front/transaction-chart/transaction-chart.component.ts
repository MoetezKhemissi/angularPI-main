
//@ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.css']
})
export class TransactionStatsChartComponent implements OnInit {
  @Input() assetId: number;

  priceData: any[] = [];
  volumeData: any[] = [];
  colorScheme = { domain: ['#5AA454', '#E44D25', '#CFC0BB'] };
  view: any[] = [700, 300];

  xAxisLabel = 'Time';
  yAxisLabel = 'Price';
  volumeYAxisLabel = 'Volume';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    setInterval(() => this.fetchData(), 15000); // Polling every 15 seconds
  }

  fetchData() {
    if (this.assetId) {
      this.fetchPriceData();
      this.fetchVolumeData();
    }
  }

  fetchPriceData() {
    
    this.http.get<any[]>(`http://localhost:8083/testspring/api/stats`).subscribe(data => {
      this.priceData = data
        .filter(item => item.assetId === this.assetId)
        .map(item => ({
          name: new Date(item.timestamp),
          value: item.lastPrice
        }));
    });
  }

  fetchVolumeData() {
    this.http.get<{ [key: string]: any }>('http://localhost:8083/testspring/api/stats/volumes').subscribe(data => {
      console.log(data)
            const assetData = data[this.assetId.toString()];
      let volumeSeries = [];

      if (assetData) {
        Object.keys(assetData).forEach(interval => {
          assetData[interval].forEach(intervalData => {
            volumeSeries.push({
              name: new Date(intervalData.timestamp),
              value: intervalData.volume
            });
          });
        });
      }

      this.volumeData = volumeSeries;
    });
  }
}
