import { Products } from '../../Products/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-getCart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './getCart.html',
  styleUrls: ['./getCart.scss'],
})
export class getCart implements OnInit {
  carts: any[] = [];
  products: any[] = [];
  total: number = 0;
  form!: FormGroup;
  details: any;

  constructor(
    private _service: CartService,
    private build: FormBuilder,
    private _products: Products,
  ) {}

  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }

  getAllCarts() {
    this._service.getAllCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  applyFilter() {
    let date = this.form.value;
    this._service.getAllCarts(date).subscribe((res: any) => {
      this.carts = res;
    });
  }
  deleteCart(id: number) {
    this._service.deleteCart(id).subscribe((res: any) => {
      this.getAllCarts();
      console.log('Cart Deleted Success' + id);
    });
  }

  view(index: number) {
    this.products = [];
    this.details = this.carts[index];
    for (let x in this.details.products) {
      this._products
        .getProductById(this.details.products[x].productId)
        .subscribe((res) => {
          this.products.push({
            item: res,
            quantity: this.details.products[x].quantity,
          });
        });
    }
  }
}
