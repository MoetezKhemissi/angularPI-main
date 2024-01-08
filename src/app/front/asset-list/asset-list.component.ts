import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})

export class AssetListComponent implements OnInit {
  assets: any[] = [];
  userId: number; // Assuming userId is of type number
  @Output() viewOrderbook = new EventEmitter<number>();
  constructor(private http: HttpClient, private router: Router) {
    // Retrieve userId (this.userService.userId)
    this.userId = 123; // Replace with actual user ID retrieval logic
  }

  ngOnInit(): void {
    this.fetchAssets();
  }

  fetchAssets(): void {
    this.http.get<any[]>(`http://localhost:8083/testspring/api/assets/minimal`)
      .subscribe((data: any[]) => {
        this.assets = data;
      });
  }

  logAssetId(assetId: number): void {
    this.viewOrderbook.emit(assetId);
  }
}