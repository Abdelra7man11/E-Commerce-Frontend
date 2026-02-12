import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Spinner } from '../loader/loader';
import { LoaderService } from '../../../loader.service';

@Component({
  selector: 'app-select',
  imports: [CommonModule, Spinner],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() SelectValue = new EventEmitter();

  constructor(private _loader: LoaderService) {}
  selected: string = 'all';

  ngOnInit(): void {}

  detectChange(event: any) {
    this._loader.showLoader(); // Start Loading
    const value = event.target.value;
    this.SelectValue.emit(value);
    setTimeout(() => {
      this._loader.hideLoader();
    }, 100); // Stop Loading
  }
}
