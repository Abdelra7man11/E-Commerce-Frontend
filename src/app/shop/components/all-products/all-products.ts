import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { Select } from '../../../shared/components/select/select';
import { ProductItem } from '../product-item/product-item';


@Component({
  selector: 'app-all-products',
  standalone: true, // مهم جدًا للـ lazy loading
  imports: [CommonModule, Spinner, Select, ProductItem],
  templateUrl: './all-products.html',
  styleUrls: ['./all-products.scss'],
})
export class AllProducts implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];
  categories: any[] = [];
  cartProducts: any[] = [];
  isLoading = false; //

  constructor(private _service: Products) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
getProducts() {
    this.isLoading = true; // ✅ نبدأ اللودينج
    this._service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.allProducts = data;
        this.isLoading = false; // ✅ نوقف اللودينج بعد النجاح
      },
      error: (err) => {
        alert(err);
        this.isLoading = false; // ✅ نوقف اللودينج لو حصل خطأ
      },
    });
  }

  getCategories() {
    this.isLoading = true;
    this._service.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        alert(err);
        this.isLoading = false;
      },
    });
  }

  filterCategory(event: any) {
    const value = event.target.value;
    this.isLoading = true; // ✅ نبدأ اللودينج

    setTimeout(() => {
      this.products = value === 'all'
        ? this.allProducts
        : this.allProducts.filter(p => p.category === value);

      this.isLoading = false; // ✅ نوقف اللودينج بعد الفلترة
    }, 200);
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
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
