import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anuncio } from './anuncio';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/anuncios';

  constructor(private http: HttpClient) { }

  getAnuncios(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.apiUrl);
  }

  adicionarAnuncio(anuncio: Anuncio): Observable<Anuncio> {
    return this.http.post<Anuncio>(this.apiUrl, anuncio);
  }

  editarAnuncio(anuncio: Anuncio): Observable<Anuncio> {
    const url = `${this.apiUrl}/${anuncio.id}`;
    return this.http.put<Anuncio>(url, anuncio);
  }

  deletarAnuncio(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
