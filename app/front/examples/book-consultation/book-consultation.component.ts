import { Component, OnInit } from '@angular/core';

import { Consultation } from 'app/front/class/consultation';
import { ConsultationService } from 'app/front/service/consultation.service';
import { IAlert } from 'app/front/components/notification/notification.component';
import { NgForm } from '@angular/forms';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-book-consultation',
  templateUrl: './book-consultation.component.html',
  styleUrls: ['./book-consultation.component.css']
})
export class BookConsultationComponent implements OnInit {

  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  data : Date = new Date();
  focus: any;
  focus1: any;
  
  
  consultations: Consultation[];
  newConsultation: Consultation = new Consultation(); // create a new instance of the Consultation class
  alerts: Array<IAlert> = [];
  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
}
addConsultation(form: NgForm) {
  this.newConsultation.typecons = form.value.type;
  console.log(form.value.type);
  this.newConsultation.motive_cons = form.value.motive;
  console.log(form.value.motive);

// Get the date from the form
   const date = form.value.dp;
   console.log(form.value.dp);
// Format the date using the DatePipe
console.log(form.value.dp); // output: e.g. 2023-04-16

// Assign the formatted date to the newConsultation object

this.consultationService.addConsultation(this.newConsultation).subscribe(
  Response=>{
    // Show success message
    this.alerts.push({
      id: 2,
      type: 'success',
      strong: 'Success!',
      message: 'Consultation added successfully.',
      icon: 'ui-2_like'
    }); 
    setTimeout(() => {
      window.location.href = 'examples/profileConsultant';
    }, 3000);
  }, 
error => {
      console.error('Error adding consultation:', error);
      // show error message
      this.alerts.push({
        id: 2,
        type: 'danger',
        strong: 'Error!',
        message: 'An error occurred while adding the consultation.',
        icon: 'objects_support-17'
      });
    }
  );
}

closeAlert(alert: IAlert) {
  const index: number = this.alerts.indexOf(alert);
  this.alerts.splice(index, 1);
}
}
