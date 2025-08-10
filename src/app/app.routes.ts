import { Routes } from '@angular/router';
import { AllProducts } from './products/components/all-products/all-products';
import { ProductsDetails } from './products/components/products-details/products-details';
import { Cart } from './carts/components/cart/cart';
import { Home } from './home/home';
import { Notfound } from './shared/components/notfound/notfound';

export const routes: Routes = [
  { path: '', component:Home },
  {path:"products",component:AllProducts},
  {path:"products/:id'",component:ProductsDetails},
  {path:"cart",component:Cart},
  { path: '**', component:Notfound}];

