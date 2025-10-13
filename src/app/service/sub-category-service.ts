import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SubCategorys } from '../interfaces/SubCategorys';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private apiUrlSubCategories = 'http://localhost:3000/SubCategories'
  constructor(private http: HttpClient) {}
    getSubCategories() {
    return this.http.get<SubCategorys[]>(this.apiUrlSubCategories)
      .pipe(
        tap(categories => console.log('categorias recebidas da API:', categories))
      );
  }
}
