import { Component, OnInit } from '@angular/core';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { Select } from '../../../shared/components/select/select';
import { ProductItem } from "../product-item/product-item";

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, Spinner, Select, ProductItem],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];
  categories: any[] = [];
  loading: boolean = false;

  constructor(private _service: Products) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this._service.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.allProducts = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert(err);
      },
    });
  }

  getCategories() {
    this.loading = true;
    this._service.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
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

  getProductsCategory(keyword: string) {
    this.loading = true;
    this._service.getProductByCategory(keyword).subscribe({
      next: (data: any) => {
        this.products = data;
        this.loading = false;
      }
    });
  }


}
