import { Component, OnInit } from '@angular/core';
import { Claim } from 'app/front/class/claim';
import { ClaimService } from 'app/front/service/claim.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  listClaim:any; 
  Claim!: Claim;
  Claimupdate!:Claim; 
  ClaimDetails:any;
  showResponseForm: { [claimId: number]: boolean } = {};
  responseText: { [claimId: number]: string } = {};
  constructor(private ClaimService:ClaimService) { 
    this.getAllClaim();
  }
  
    ngOnInit():void {}
  getAllClaim() {
    this.ClaimService.getAllClaim().subscribe(res => {
      this.listClaim = res;   console.log(this.listClaim);
    });
  }
  deleteClaim(id: number) {
    this.ClaimService.deleteClaim(id).subscribe(() => this.getAllClaim(), res => {
      this.listClaim = res;
    });
  }



  toggleResponseForm(claimId: number) {
    if (!this.showResponseForm[claimId]) {
      this.showResponseForm[claimId] = true;
      this.responseText[claimId] = ''; // Réinitialisez le champ de texte lorsque le formulaire est ouvert
    } else {
      this.showResponseForm[claimId] = false;
    }
  }

  repondreClaim(claimId: number, reponse: string) {
    this.ClaimService.repondreClaim(claimId, reponse).subscribe(
      updatedClaim => {
        // Mettez à jour la liste des réclamations après avoir ajouté la réponse
        this.getAllClaim();
        // Fermez le formulaire de réponse
        this.toggleResponseForm(claimId);
      },
      error => {
        // Gérez les erreurs ici, si nécessaire
        console.error('Erreur lors de l\'ajout de la réponse :', error);
      }
    );
  }
  
}
