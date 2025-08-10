import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Home } from './home/home';
import { Notfound } from './shared/components/notfound/notfound';
import { ProductsDetails } from './products/components/products-details/products-details';
import { AllProducts } from './products/components/all-products/all-products';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header, Home, AllProducts, ProductsDetails, Notfound],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-Commerce');
}
