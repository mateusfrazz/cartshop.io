import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../interfaces/Banner';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Categories } from '../interfaces/Categories';

@Injectable({
  providedIn: 'root'
})
export class getImages {
    private apiUrl = 'http://localhost:3000/banners'
  constructor(
    private http: HttpClient) {}

  getBanners() {
    return this.http.get<Banner[]>(this.apiUrl)
      .pipe(
        tap(banners => console.log('Banners recebidos da API:', banners))
      );
  }

   

}