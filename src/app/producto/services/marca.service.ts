import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl ='http://localhost:8080/api/marcas';
  constructor(private http:HttpClient) { }
  getMarca():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.apiUrl);
  }
  getMarcaById(id:number):Observable<Marca>{
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  createMarca(categoria: Marca): Observable<Marca> {    
    return this.http.post<Marca>(this.apiUrl, categoria);
  }

  deleteMarca(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateMarca(categoria:Marca, id:number): Observable<Marca>{
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, categoria);
  }
}
