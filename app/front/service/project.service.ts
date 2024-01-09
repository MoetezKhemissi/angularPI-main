import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'app/front/class/project'; // importez le modèle de données de votre projet ici

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiBaseUrl = 'http://localhost:8080/Project'; // l'URL de base de votre API Spring Boot

  constructor(private http: HttpClient) { }

  afficher(): Observable<Project[]> {
    const url = `${this.apiBaseUrl}/afficher`; // l'URL de votre méthode Spring Boot
    return this.http.get<Project[]>(url);
  }

  ajouter(project: Project): Observable<any> {
    const url = `${this.apiBaseUrl}/ajouterProject`;
    return this.http.post<any>(url, project);
  }
  edit(project: Project): Observable<any> {
    const url = `${this.apiBaseUrl}/ModifierProject`;
    return this.http.put<any>(url, project);
}

  
}


