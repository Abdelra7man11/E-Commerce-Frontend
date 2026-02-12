import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products.service';
import { Spinner } from '../../../shared/components/loader/loader';
import { Select } from '../../../shared/components/select/select';
import { ProductItem } from '../product-item/product-item';
import { IProduct } from '../../models/product';
import { ICategory } from '../../models/category';
import { LoaderService } from '../../../loader.service';
import { error } from 'console';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, Spinner, Select, ProductItem],
  templateUrl: './all-products.html',
  styleUrls: ['./all-products.scss'],
})
export class AllProducts implements OnInit {
  products: IProduct[] = [];
  allProducts: any[] = [];
  categories: ICategory[] = [];
  cartProducts: any[] = [];

  constructor(
    private _service: Products,
    private _loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._loaderService.showLoader(); // Start Loading
    this._service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.allProducts = data;
      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        this._loaderService.hideLoader(); // Stop Loading in Complete
      },
    });
  }

  getCategories() {
    this._loaderService.showLoader(); // Start Loading
    this._service.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        this._loaderService.hideLoader(); // Stop Loading in Complete
      },
    });
  }

  filterCategory(value: any) {
    // const value = event.target.value;

    setTimeout(() => {
      this.products =
        value === 'all'
          ? this.allProducts
          : this.allProducts.filter((p) => p.category === value);
    }, 200);
  }

  message: string = ''; // الرسالة اللي هتظهر للمستخدم

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.item.id == event.item.id,
      );
      if (exist) {
        this.message = 'Product is already in your cart';
        setTimeout(() => {
          this.message = ''; // اختفاء الرسالة بعد 3 ثواني
        }, 3000);
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.message = 'Product added to your cart';
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.message = 'Product added to your cart';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}
