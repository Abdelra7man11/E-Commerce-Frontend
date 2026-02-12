import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${environment.apiUrl}products`);
  }
  // getAllProducts() {
  //   return this._http.get(`https://fakestoreapi.in/api/products`);
  // }

  getAllCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(
      `${environment.apiUrl}products/categories`,
    );
  }

  getProductsByCategory(keyword: string) {
    return this._http.get(`${environment.apiUrl}products/category/${keyword}`);
  }

  getProductById(id: any) {
    return this._http.get(`${environment.apiUrl}products/${id}`);
  }
}
