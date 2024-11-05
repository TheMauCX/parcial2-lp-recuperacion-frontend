import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private apiUrl ='http://localhost:8080/api/facultades';
  constructor(private http:HttpClient) { }
  //listar las categoria
  getFacultad():Observable<Facultad[]>{
    return this.http.get<Facultad[]>(this.apiUrl);
  }
  getFacultadById(id:number):Observable<Facultad>{
    return this.http.get<Facultad>(`${this.apiUrl}/${id}`);
  }
  createFacultad(categoria: Facultad): Observable<Facultad> {    
    return this.http.post<Facultad>(this.apiUrl, categoria);
  }
  deleteFacultad(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateFacultad(categoria:Facultad, id:number): Observable<Facultad>{
    return this.http.put<Facultad>(`${this.apiUrl}/${id}`, categoria);
  }
}
