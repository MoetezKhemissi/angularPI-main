import { Component, OnInit } from '@angular/core';
import { Project } from 'app/front/class/project';
import { ProjectService } from 'app/front/service/project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  newProject: Project = new Project();

  constructor(private projectService: ProjectService) { }


  ngOnInit(): void {
  }
  ajouter(): void {
    this.projectService.ajouter(this.newProject)
      .subscribe(response => {
        console.log(response);
        
        this.newProject = new Project();
      });
  }
  modifier(project: Project): void {
    this.projectService.edit(project)
      .subscribe(response => {
        console.log(response);
      });
  }

}
