import { Routes } from '@angular/router';
import { Notfound } from './shared/components/notfound/notfound';
import { AllProducts } from './Products/components/all-products/all-products';
import { ProductDetails } from './Products/components/product-details/product-details';
import { Cart } from './carts/cart/cart';
import { getCart } from './carts/cartAdmin/getCart';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: AllProducts },
  { path: 'products', component: AllProducts, canActivate: [authGuard] },
  {
    path: 'products/details/:id',
    component: ProductDetails,
    canActivate: [authGuard],
  },
  { path: 'cart', component: Cart },
  { path: 'cartAdmin', component: getCart },

  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },

  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },

  { path: '**', component: Notfound },
];
