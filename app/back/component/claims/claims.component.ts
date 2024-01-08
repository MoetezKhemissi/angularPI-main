import { Component, OnInit } from '@angular/core';
import { Claim } from 'app/front/class/claim';
import { ClaimService } from 'app/front/service/claim.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims:Claim[];
  constructor(private service:ClaimService) { }

  ngOnInit(): void {
    this.service.getclaims().subscribe((data:any[])=>{
      this.claims=data;
    })
  }
  
}
