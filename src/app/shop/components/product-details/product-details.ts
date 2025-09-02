import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Spinner } from "../../../shared/components/spinner/spinner";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, Spinner],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  id: any;
  data: any = {};
  isLoading = false; // ✅ متغير اللودينج
  constructor(private route: ActivatedRoute, private _service: Products) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }
getProduct() {
    this.isLoading = true; // ✅ نبدأ اللودينج
    this._service.getProductById(this.id).subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false; // ✅ نوقف اللودينج بعد النجاح
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; // ✅ نوقف اللودينج لو حصل خطأ
      }
    });
  }
}
