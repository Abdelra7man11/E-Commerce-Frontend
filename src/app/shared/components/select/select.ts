import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss'
})
export class Select implements OnInit{

@Input() title:string=""
@Input() data:any[]=[]
@Output() SelectValue = new EventEmitter()

ngOnInit(): void {}


  detectChange(event:any){
    this.SelectValue.emit(event)
  }



}
