import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderbookService } from '../orderbook/orderbook.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {
  //@ts-ignore
  assetDetails: any;
  @Input() assetId: number;
  bidOrders: any[] = [];
  askOrders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderbookService: OrderbookService
  ) {}

  ngOnInit() {
   
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.assetId) {
      this.fetchOrders();
    }
  }



  fetchOrders(): void {
    this.orderbookService.getBidOrders(this.assetId)
      .subscribe((data: any) => {
        this.bidOrders = data;
      });
  
    this.orderbookService.getAskOrders(this.assetId)
      .subscribe((data: any) => {
        this.askOrders = data;
      });
  }
}