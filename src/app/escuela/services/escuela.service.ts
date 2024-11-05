import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Escuela } from '../models/escuela';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private apiUrl ='http://localhost:8080/api/carreras';
  constructor(private http:HttpClient) { }
  //listar las escuelas
  getEscuelas():Observable<Escuela[]>{
    return this.http.get<Escuela[]>(this.apiUrl);
  }
  getEscuelaById(id:number):Observable<Escuela>{
    return this.http.get<Escuela>(`${this.apiUrl}/${id}`);
  }

  createEscuela(categoria: Escuela): Observable<Escuela> {    
    return this.http.post<Escuela>(this.apiUrl, categoria);
  }

  deleteEscuela(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateEscuela(categoria:Escuela, id:number): Observable<Escuela>{
    return this.http.put<Escuela>(`${this.apiUrl}/${id}`, categoria);
  }
}
