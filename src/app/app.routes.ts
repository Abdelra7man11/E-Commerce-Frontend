import { Routes } from '@angular/router';
import { Notfound } from './shared/components/notfound/notfound';
import { AllProducts } from './Products/components/all-products/all-products';
import { ProductDetails } from './Products/components/product-details/product-details';
import { Cart } from './carts/cart/cart';
import { getCart } from './carts/cartAdmin/getCart';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: AllProducts },
  { path: 'products', component: AllProducts },
  { path: 'products/details/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'cartAdmin', component: getCart },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', component: Notfound },
];
