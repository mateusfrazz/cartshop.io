import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Produtos } from '../interfaces/Produtos';

@Injectable({
  providedIn: 'root'
})
export class Products {
  private apiUrlProducts = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Produtos[]>(this.apiUrlProducts)
      .pipe(
        tap(products => console.log('Produtos recebidos da API:', products))
      );
  }
}
