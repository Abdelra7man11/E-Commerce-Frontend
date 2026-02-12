import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../services/cart.service';

declare var bootstrap: any; // Bootstrap JS API

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart implements OnInit, AfterViewInit {
  cartProducts: any[] = [];
  total: number = 0;
  selectedIndex: number | null = null; // delete product
  success: boolean = false; // To show success order

  constructor(private _service: CartService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  selectedProduct: any = null;
  deleteModal: any;
  clearModal: any;
  viewModal: any;

  ngAfterViewInit(): void {
    // Modals
    const deleteEl = document.getElementById('confirmDeleteModal');
    const clearEl = document.getElementById('confirmClearCartModal');
    const viewEl = document.getElementById('viewProductModal');

    this.deleteModal = new bootstrap.Modal(deleteEl);
    this.clearModal = new bootstrap.Modal(clearEl);
    this.viewModal = new bootstrap.Modal(viewEl);
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  getCartProducts() {
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = this.cartProducts.reduce(
      (sum, p) => sum + p.item.price * p.quantity,
      0,
    );
  }

  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    this.updateCart();
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.getCartTotal();
      this.updateCart();
    }
  }

  detectChange() {
    this.getCartTotal();
    this.updateCart();
  }
  viewProduct(index: number) {
    this.selectedProduct = this.cartProducts[index];
    this.viewModal.show();
  }
  confirmDelete(index: number) {
    this.selectedIndex = index;
    this.deleteModal.show(); // فتح المودال
  }

  deleteProduct() {
    if (this.selectedIndex !== null) {
      this.cartProducts.splice(this.selectedIndex, 1);
      this.getCartTotal();
      this.updateCart();
      this.selectedIndex = null;
      this.deleteModal.hide(); // غلق المودال
    }
  }

  confirmClearCart() {
    this.clearModal.show(); // فتح مودال تفريغ السلة
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    this.updateCart();
    this.clearModal.hide(); // غلق المودال
  }

  AddCart() {
    const ResponseData = this.cartProducts.map((item) => ({
      productId: item.item.id,
      quantity: item.quantity,
    }));

    const model = {
      userId: 1,
      date: new Date(),
      Products: ResponseData,
    };

    this._service.createNewCart(model).subscribe({
      next: () => {
        this.success = true;
        this.updateCart();
        localStorage.removeItem('cart');
      },
      error: (err) => console.error(err),
    });
    console.log(model);
  }
}
