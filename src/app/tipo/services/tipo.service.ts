import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl ='http://localhost:8080/api/tipos';
  constructor(private http:HttpClient) { }
  getTipo():Observable<Tipo[]>{
    return this.http.get<Tipo[]>(this.apiUrl);
  }
  getTipoById(id:number):Observable<Tipo>{
    return this.http.get<Tipo>(`${this.apiUrl}/${id}`);
  }

  createTipo(categoria: Tipo): Observable<Tipo> {    
    return this.http.post<Tipo>(this.apiUrl, categoria);
  }

  deleteTipo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateTipo(categoria:Tipo, id:number): Observable<Tipo>{
    return this.http.put<Tipo>(`${this.apiUrl}/${id}`, categoria);
  }
}