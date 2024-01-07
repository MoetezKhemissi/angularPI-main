import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'app/front/service/event.service';
import { Event } from 'app/front/class/Event';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  listEvent: any;
  Archivelist: any;
  Event!: Event;
  Eventupdate!: Event;
  EventDetails: any;
  showModal: boolean = false;
  searchFormVisible: boolean = false;
  searchForm: FormGroup;
type:any; 
listPart:any;
ideventt:any;
name:any;
closeResult = '';
  constructor(private EventService: EventService, private fb: FormBuilder,private modalService: NgbModal) {
    this.getArchiveEvent();
    this.getAllEvent();
    this.searchForm = this.fb.group({
      eventName: [''],
      eventPrice: [''],
      typeEvent: [''],
      eventDescription: [''],
      eventDate: [''],
      eventCapacity: ['']
    });
  }

  ngOnInit(): void {
    this.Event = {
      eventId: null,
      eventName: null,
      eventPrice: null,
      typeEvent: null,
      eventDescription: null,
      eventDate: null,
      eventCapacity: null
    };

    this.Eventupdate = {
      eventId: null,
      eventName: null,
      eventPrice: null,
      typeEvent: null,
      eventDescription: null,
      eventDate: null,
      eventCapacity: null
    };
  }
//----------------
open(content:any,id:any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
  this.EventService.Listdesparticipants(id).subscribe(res => {
    this.listPart = res;
  });
}
//------------------------------
openupdate(contentt:any,Eventt: any) {
  this.modalService.open(contentt, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
  this.Eventupdate = Eventt;
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
//-----------------

  
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
  getAllparticipant(id:any) {
    this.EventService.Listdesparticipants(id).subscribe(res => {
      this.listPart = res;
    });
  }
OrderByDate() {
    this.EventService.OrderByDate().subscribe((res: any) => {
      this.listEvent = res;
    });
  }
  getArchiveEvent() {
    this.EventService.getArchiveEvent().subscribe(res => {
      this.Archivelist = res;
    });
  }

  addEvent() {
    this.EventService.addEvent(this.Event).subscribe(() => this.getAllEvent());
  }

  deleteEvent(id: number) {
    this.EventService.deleteEvent(id).subscribe(() => this.getAllEvent(), res => {
      this.listEvent = res;
    });
  }

  

  getActivitydetails() {
    this.EventService.getEvent(this.Eventupdate.eventId).subscribe(res => {
      this.EventDetails = res;
    });
  }

  updateEvent() {
    this.EventService.updateEvent(this.Eventupdate).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }  
}
