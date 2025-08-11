import { Component, OnInit } from '@angular/core';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule ],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss'
})
export class AllProducts implements OnInit {

products: any[] = [];
  constructor(private _service:Products){}

  ngOnInit():void{
  this.getProducts();
}


getProducts(){
this._service.getAllProducts()
.subscribe((data: any) => {
      console.log(data); // تشوف شكلها في الـ console
      this.products = data.Data ?? []; // لو Data مش موجودة يرجع Array فاضي
})
}
}
