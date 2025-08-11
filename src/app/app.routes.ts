import { Routes } from '@angular/router';
import { Cart } from './carts/components/cart/cart';
import { Home } from './home/home';
import { Notfound } from './shared/components/notfound/notfound';
import { AllProducts } from './shop/components/all-products/all-products';
import { ProductDetails } from './shop/components/product-details/product-details';

export const routes: Routes = [
  { path: '', component:Home },
  { path:"products",component:AllProducts},
  { path:"products/:id",component:ProductDetails},
  { path:"cart",component:Cart},
  { path: '**', component:Notfound}];

