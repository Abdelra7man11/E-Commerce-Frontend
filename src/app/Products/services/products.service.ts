import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get(`${environment.apiUrl}products`);
  }
  // getAllProducts() {
  //   return this._http.get(`https://fakestoreapi.in/api/products`);
  // }

  getAllCategories() {
    return this._http.get(`${environment.apiUrl}products/categories`);
  }

  getProductsByCategory(keyword: string) {
    return this._http.get(`${environment.apiUrl}products/category/${keyword}`);
  }

  getProductById(id: any) {
    return this._http.get(`${environment.apiUrl}products/${id}`);
  }
}
