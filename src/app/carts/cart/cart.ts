import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  selectedIndex: number | null = null; // delete product
  clearConfirm: boolean = false; //delete shopping
  success: boolean = false; // To Success add order

  constructor(private _service: CartService) {}

  ngOnInit(): void {
    this.getCartProducts();
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
      0
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

  confirmDelete(index: number) {
    this.selectedIndex = index;
  }

  deleteProduct() {
    if (this.selectedIndex !== null) {
      this.cartProducts.splice(this.selectedIndex, 1);
      this.getCartTotal();
      this.updateCart();
      this.selectedIndex = null; // reset
    }
  }

  confirmClearCart() {
    this.clearConfirm = true; // To Open Modal in HTML
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    this.updateCart();
    this.clearConfirm = false;
  }

  AddCart() {
    let ResponseData = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let model = {
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
      error: (err) => {
        alert(err);
      },
    });
    console.log(model);
  }
}
