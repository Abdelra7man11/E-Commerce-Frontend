import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Notfound } from './shared/components/notfound/notfound';
import { AllProducts } from './shop/components/all-products/all-products';
import { ProductDetails } from './shop/components/product-details/product-details';
import { Carts } from './carts/carts';

export const routes: Routes = [
  { path: '', component:Home },
  { path:"products",component:AllProducts},
  { path:"products/:id",component:ProductDetails},
  { path:"cart",component:Carts},
  { path: '**', component:Notfound}];



