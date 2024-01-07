import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/front/service/event.service';
import { Event } from 'app/front/class/Event';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  listEvent: any;
 Event:Event; 
  type:any; 
  listPart:any;
  ideventt:any;
  name:any;
  idUser:any;
  participated:boolean;
  part:any;
  constructor(private EventService: EventService) { 
    this.getAllEvent();

  }

  ngOnInit(): void {
    this.idUser=3;

    this.Event = {
      eventId:null,
      eventName: null,
      eventPrice: null,
      typeEvent: null,
      eventDescription: null,
      eventDate: null,
      eventCapacity: null
    };

  }
  searchEventByName() {
    this.EventService.getEventByName(this.name).subscribe((res: any) => {
      this.listEvent = res;
    });
  }

  searchEventByType() {
    this.EventService.getEventByType(this.type).subscribe((res: any) => {
      this.listEvent = res;
    });
    
  }
  getAllEvent() {
    this.EventService.getAllEvent().subscribe(res => {
      this.listEvent = res;
    });
  }
  participer(id:any){
    this.participated = true;
    this.EventService.participer(this.idUser,id).subscribe(  (res) => {
      // Si la réponse renvoie un Account, l'opération a réussi
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'L\'opération a été effectuée avec succès!',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (err) => {
      // Si la réponse renvoie une erreur, afficher un message d'erreur correspondant
      if (err.status === 400 && err.error.message === 'Account already assigned to InternalService') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Une erreur est produite ! ',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Vous participez déja à cet évènement!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

  }
  annulerparticiper(id:any){
    this.participated = false;

    this.EventService.annulerparticiper(this.idUser,id).subscribe(  (res) => {
      // Si la réponse renvoie un Account, l'opération a réussi
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre participation est annulée avec succés!',
        showConfirmButton: false,
        timer: 1500
      });
    },
    (err) => {
      // Si la réponse renvoie une erreur, afficher un message d'erreur correspondant
      if (err.status === 400 && err.error.message === 'Account not assigned to InternalService') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Une erreur est produite ! ',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Vous ne participez pas à cet évènement !',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

  }
  votelike(id: any) {
    this.EventService.voteLike(id, this.idUser).subscribe((res) => {
      this.part = res;
      if (this.part === null) {
        // Si la réponse est nulle, afficher un message d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous avez déjà voté pour cet événement!'
        });
      } else {
        // Si la réponse n'est pas nulle et renvoie un code HTTP 200, afficher un message de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Votre vote a été enregistré avec succès!'
        });
      }
    });
  }
  votedislike(id: any) {
    this.EventService.voteDislike(id, this.idUser).subscribe((res) => {
      this.part = res;
      if (this.part === null) {
        // Si la réponse est nulle, afficher un message d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous avez déjà voté pour cet événement!'
        });
      } else {
        // Si la réponse n'est pas nulle et renvoie un code HTTP 200, afficher un message de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Votre vote a été enregistré avec succès!'
        });
      }
    });
  }

}
