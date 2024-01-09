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
  
  createclaim(){
   this.claim.creationdate_claim=new Date();
   this.claim.status='pending';
   this.claim.status='pending';
    this.service.createclaim(this.claim).subscribe((data:Claim)=>{
      console.log('claim successfully created')
      this.router.navigate(['/examples/landing']);

    },
    (error:any)=>{
      console.log(error)
    });
    

  }

  
 
}
