import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products.service';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { Select } from '../../../shared/components/select/select';
import { ProductItem } from '../product-item/product-item';
import { IProduct } from '../../models/product';
import { ICategory } from '../../models/category';

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
  loadingCount = 0; // Variable Loading

  constructor(private _service: Products) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  //  Loading
  private startLoading() {
    this.loadingCount++;
  }
  private stopLoading() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
  }
  get isLoading(): boolean {
    return this.loadingCount > 0;
  }

  getProducts() {
    this.startLoading();
    this._service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.allProducts = data;
        this.stopLoading();
      },
      error: (err) => {
        alert(err);
        this.stopLoading();
      },
    });
  }

  getCategories() {
    this.startLoading();
    this._service.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.stopLoading();
      },
      error: (err) => {
        alert(err);
        this.stopLoading();
      },
    });
  }

  filterCategory(value: any) {
    // const value = event.target.value;
    this.startLoading();

    setTimeout(() => {
      this.products =
        value === 'all'
          ? this.allProducts
          : this.allProducts.filter((p) => p.category === value);

      this.stopLoading();
    }, 200);
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.item.id == event.item.id,
      );
      if (exist) {
        alert('Product is already in your cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
