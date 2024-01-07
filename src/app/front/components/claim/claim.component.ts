import { Component, OnInit } from '@angular/core';
import { Claim } from 'app/front/class/claim';
import { ClaimService } from 'app/front/service/claim.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {

  constructor(private service:ClaimService,private router:Router) { }
 
  claim:Claim=new Claim();
  clientId:any=2; 

  createclaim(){
     this.claim.creationDate = new Date();
     this.service.assignClaimtoUser(this.clientId,this.claim).subscribe(); 
  }

  
 
}
