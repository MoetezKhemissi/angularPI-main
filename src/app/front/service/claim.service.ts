import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investesment } from 'app/front/class/investesment';
import { Observable } from 'rxjs';
import { Claim } from '../class/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  
  private API_URL_CLAIM = "http://localhost:8083/testspring/Claim";
  private API_URL_CLAIM_DTO = "http://localhost:8083/testspring/ClaimDTO";
  
  
  constructor(private httpClient: HttpClient) { }



  getAllClaim() {
    return this.httpClient.get(`${this.API_URL_CLAIM_DTO}/withUserNames`);
  }

  deleteClaim(id: any) {
    return this.httpClient.delete(`${this.API_URL_CLAIM}/delete/${id}`);
  }

  repondreClaim(claimId: any, reponse: any) {
    const responsePayload = { reponse: reponse };
    return this.httpClient.post(`${this.API_URL_CLAIM}/repondre/${claimId}`, responsePayload);
  }
  assignClaimtoUser(idClient:any,claim:any){
    return this.httpClient.post(`http://localhost:8083/testspring/Claim/addAndAssignToUser/${idClient}`,claim);

  }
  retrieveClaimByUser(idClient:any){
    return this.httpClient.get(`http://localhost:8083/testspring/Claim/getClaimsbyUser/${idClient}`);

  }
}
