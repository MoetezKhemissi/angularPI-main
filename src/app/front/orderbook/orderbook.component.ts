import { Component, Input, OnInit } from '@angular/core';
import { OrderbookService } from './orderbook.service';
import { RefreshService } from '../../refresh.service';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.css']
})
export class OrderbookComponent implements OnInit {
  bidOrders: any[] = [];
  askOrders: any[] = [];
  currentPrice: string | undefined;
  //@ts-ignore
  @Input() assetId: number;
  constructor(private orderbookService: OrderbookService,private refreshService: RefreshService) {}

  ngOnInit() {
    this.refreshService.refresh$.subscribe(() => {
      // Perform actions to refresh the component (e.g., reload data)
      this.reloadData(); // Implement this method to refresh data
    });
    
    this.reloadData();
  }
  reloadData(): void {
    this.orderbookService.getBidOrders(this.assetId).subscribe((data: any) => {
      this.bidOrders = data;
      console.log('Bid Orders:', data); // Log received bid orders
    });
  
    this.orderbookService.getAskOrders(this.assetId).subscribe((data: any) => {
      this.askOrders = data;
      console.log('Ask Orders:', data); // Log received ask orders
    });
    this.orderbookService.getLastPrice(this.assetId).subscribe(
      (data: any) => {
        // If data is available, set currentPrice to the last price
        this.currentPrice = data || 'Undetermined';

      },
      (error: any) => {
        console.error('Error fetching last price', error);
        this.currentPrice = 'Undetermined'; // Set as 'Undetermined' in case of error
        
      }
    );
  }
}