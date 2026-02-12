import { Component } from '@angular/core';
import { LoaderService } from '../../../loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  showLoader: boolean = false;
  constructor(private _loaderService: LoaderService) {
    this._loaderService.isLoading.subscribe(
      (value) => (this.showLoader = value),
    );
  }
}
