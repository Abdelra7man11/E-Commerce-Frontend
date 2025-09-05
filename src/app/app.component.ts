import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Home } from './home/home';
import { Notfound } from './shared/components/notfound/notfound';
import { AllProducts } from './Products/components/all-products/all-products';
import { ProductDetails } from './Products/components/product-details/product-details';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-Commerce');
}
