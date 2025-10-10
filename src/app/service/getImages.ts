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
    private apiUrlCategories = 'http://localhost:3000/categoriaData'

  constructor(
    private http: HttpClient) {}

  getBanners() {
    return this.http.get<Banner[]>(this.apiUrl)
      .pipe(
        tap(banners => console.log('Banners recebidos da API:', banners))
      );
  }

    getCategories() {
    return this.http.get<Categories[]>(this.apiUrlCategories)
      .pipe(
        tap(categories => console.log('categorias recebidas da API:', categories))
      );
  }

}