import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Produtos } from '../interfaces/Produtos';
import { Categories } from '../interfaces/Categories';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrlProducts = environment.apiUrl + 'products';
private apiUrlCategories = environment.apiUrl + 'categoriaData';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Produtos[]>(this.apiUrlProducts)
      .pipe(
        tap(products => console.log('Produtos recebidos da API:', products))
      );
  }
   getCategories() {
    return this.http.get<Categories[]>(this.apiUrlCategories)
      .pipe(
        tap(categories => console.log('categorias recebidas da API:', categories))
      );
  }
}
