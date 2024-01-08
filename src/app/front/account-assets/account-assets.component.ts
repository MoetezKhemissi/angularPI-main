import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';

interface Asset {
  assetName: string;
  assetDescription: string;
  assetVolumeOwned: number;
}

@Component({
  selector: 'app-account-assets',
  templateUrl: './account-assets.component.html',
  styleUrls: ['./account-assets.component.css']
})
export class AccountAssetsComponent implements OnInit {
  assets: Asset[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAssets();
  }

  fetchAssets(): void {
    const userId = this.userService.userId;
    this.http.get<any[]>(`http://localhost:8083/testspring/api/account-assets/account/${userId}`)
      .subscribe(
        (data: any[]) => {
          this.assets = data.map(item => ({
            assetName: item.assetName,
            assetDescription: item.assetDescription,
            assetVolumeOwned: item.assetVolumeOwned
          }));
        },
        error => {
          console.error('Error fetching assets:', error);
        }
      );
  }
}