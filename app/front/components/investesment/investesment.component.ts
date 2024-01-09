import { Component, OnInit } from '@angular/core';
import { Investesment } from 'app/front/class/investesment';
import { InvestesmentService } from 'app/front/service/investesment.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-investesment',
  templateUrl: './investesment.component.html',
  styleUrls: ['./investesment.component.css']
})
export class InvestesmentComponent {
  finalAmount: any;

  constructor(private service:InvestesmentService) { this.service.getfinal();
    //this.getinvestesment();
  }
  fundid:number;
 
  investesment:Investesment=new Investesment();
  
  createinvestement(){
   console.log(this.investesment.amout_investesment)
    this.service.createinvestement(this.fundid,this.investesment).subscribe((data:Investesment)=>{
      this.investesment.id_investesment=data.id_investesment;
      this.service.getfinal();
    //this.getinvestesment();
    this.getInvestment();

    },
    (error:any)=>{
      console.log(error)
    });
    

  }

  
  /*getinvestesment(){
    this.service.getinvestement(this.investesment.id_investesment).subscribe((data:Investesment)=>{
      this.investesment.taux_inves=data.taux_inves;
      this.investesment.final_amount=data.final_amount;
    });
  }
  */
  getfinal() {
    this.service.getfinal().subscribe(
      (data: any) => {
        this.finalAmount = data.finalAmount;
      }
    );
  }
  getInvestment() {
    this.service.getinvestement(this.investesment.id_investesment).pipe(
      switchMap((investmentData: Investesment) => {
        this.investesment.taux_inves = investmentData.taux_inves;
        return this.service.getfinal();
      })
    ).subscribe(
      (finalData: any) => {
        this.investesment.final_amount = finalData.finalAmount;
      }
    );
  }
}
