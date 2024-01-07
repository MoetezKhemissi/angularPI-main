import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private API_URL = " http://localhost:8083/testspring/Event";
  constructor(private httpClient: HttpClient) { }

  addEvent(event : any) {
    return this.httpClient.post(`${this.API_URL}/add`, event)
  }
  
 
  updateEvent(event: any) {
    return this.httpClient.put(`${this.API_URL}/update`, event);
  }

  deleteEvent(Id : number){
    return  this.httpClient.delete(`${this.API_URL}/delete/${Id}`)
  }
 getEvent(Id : any){
    return  this.httpClient.get(`${this.API_URL}/get/${Id}`)
  }
  getArchiveEvent(){
    return this.httpClient.get(`${this.API_URL}/getArchive`)
  }
  
  Listdesparticipants(id:any){
    return this.httpClient.get(`http://localhost:8083/testspring/User/participant/${id}`)
  }
  getAllEvent(){
    return this.httpClient.get(`${this.API_URL}/all`)
  }
  getEventByType(type:any){
    return this.httpClient.get(`${this.API_URL}/getByType/${type}`)
  }
  getEventByName(name:any){
    return this.httpClient.get(`${this.API_URL}/getByName/${name}`)
  }
  OrderByDate(){
    return this.httpClient.get(`${this.API_URL}/orderbyDate`)
  }
  participer(idClient:any,idEvent:any){
    return this.httpClient.put(`http://localhost:8083/testspring/User/assignEventToUser/${idClient}/${idEvent}`,null);
  }
    annulerparticiper(idClient:any,idEvent:any){
    return this.httpClient.put(`http://localhost:8083/testspring/User/unassignEventFromUser/${idClient}/${idEvent}`,null);
  }
  voteLike(idevent:any,idclient:any){
    return this.httpClient.post(`http://localhost:8083/testspring/Vote/votelike/${idevent}/${idclient}`,null);
  }
  voteDislike(idevent:any,idclient:any){
    return this.httpClient.post(`http://localhost:8083/testspring/Vote/votedislike/${idevent}/${idclient}`,null);
  }
}
