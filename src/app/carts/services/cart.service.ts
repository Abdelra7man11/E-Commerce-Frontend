import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}

  createNewCart(model: any) {
    return this._http.post(`${environment.apiUrl}carts`, model);
  }

  getAllCarts(param?: any) {
    let params = new HttpParams();
    params = params
      .append('startDate', param?.start)
      .append('endDate', param?.end);
    return this._http.get(environment.apiUrl + 'carts', { params });
  }

  deleteCart(id: number) {
    return this._http.delete(`${environment.apiUrl}carts/${id}`);
  }
}
