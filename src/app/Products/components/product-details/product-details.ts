import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products.service';
import { Spinner } from '../../../shared/components/loader/loader';
import { LoaderService } from '../../../loader.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, Spinner],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  id: any;
  data: any = {};
  constructor(
    private route: ActivatedRoute,
    private _service: Products,
    private _loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }
  getProduct() {
    this._loaderService.showLoader();
    this._service.getProductById(this.id).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this._loaderService.hideLoader(); // Stop Loading in Complete
      },
    });
  }
}
