import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-item',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem  {

  @Input() data:any={}
  @Output() item = new EventEmitter();
  addButton:boolean=false;
  amount: number = 1;


 Add(){
    this.item.emit({item:this.data ,quantity:this.amount})
  }
}
