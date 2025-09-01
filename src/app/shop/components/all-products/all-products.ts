import { Component, OnInit } from '@angular/core';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { Select } from '../../../shared/components/select/select';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, Spinner, Select, ProductItem],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];   // نسخة أصلية
  categories: any[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];

  constructor(private _service: Products) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.allProducts = data;   // خزنا نسخة بدون فلتر
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  getCategories() {
    this._service.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  filterCategory(event: any) {
    const value = event.target.value;
    if (value === 'all') {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter((p) => p.category === value);
    }
  }

  addToCart(event: any) {
    // JSON.stringify() // Send data
    // JSON.parse() // Receive  data

    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.id == event.id);
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
