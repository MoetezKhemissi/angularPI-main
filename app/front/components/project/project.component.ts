import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/front/service/project.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'app/front/class/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  listProjects: Project[];
  data : Date = new Date();
  focus:any;
  focus1:any;
  constructor(private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.afficher().subscribe(res => {
      this.listProjects = res;
    });
  }
}
