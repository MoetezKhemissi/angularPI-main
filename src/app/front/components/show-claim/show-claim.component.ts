import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'app/front/service/claim.service';

@Component({
  selector: 'app-show-claim',
  templateUrl: './show-claim.component.html',
  styleUrls: ['./show-claim.component.css']
})
export class ShowClaimComponent implements OnInit {
  listClaim: any;
  idUser:any; 
  constructor(private ClaimService: ClaimService) { 
    this.getAllClaim();

  }

  ngOnInit(): void {
    this.idUser=2; 
  }
  getAllClaim() {
    this.ClaimService.retrieveClaimByUser(2).subscribe(res => {
      this.listClaim = res;
    });
  }
}
