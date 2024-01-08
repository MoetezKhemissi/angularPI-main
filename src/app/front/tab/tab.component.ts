import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { RefreshService } from '../../refresh.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  balance: number | undefined;
  selectedTab = 2;
  selectedAssetId: number ;



  constructor(
    private userService: UserService,
    private refreshService: RefreshService,
  
  ) { }

  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.fetchBalance();
    });

    this.fetchBalance();
  }

  selectTab(tabNumber: number): void {
    this.selectedTab = tabNumber;
  }
  showAssetDetails(assetId: number) {
    this.selectedAssetId = assetId;
    console.log(this.selectedAssetId)
  }
  fetchBalance(): void {
    const userId = this.userService.userId;
    this.userService.getBalance(userId).subscribe(
      (balance: number) => {
        this.balance = balance;
      },
      (error: any) => {
        console.error('Error fetching balance', error);
        this.balance = undefined;
      }
    );
  }
}