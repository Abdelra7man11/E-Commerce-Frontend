import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {

  @Input() data:any={}
  @Output() item = new EventEmitter()

  Add(){
    this.item.emit(this.data)
  }



}
