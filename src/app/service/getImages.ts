import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../interfaces/Banner';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class getImages {
    private apiUrl = environment.apiUrl + 'banners';
  constructor(
    private http: HttpClient) {}

  getBanners() {
    return this.http.get<Banner[]>(this.apiUrl)
      .pipe(
        tap(banners => console.log('Banners recebidos da API:', banners))
      );
  }

   

}