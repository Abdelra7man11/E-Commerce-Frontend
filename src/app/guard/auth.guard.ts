import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = localStorage.getItem('authToken');
  const router = inject(Router);
  if (auth == 'true') {
    return true;
  } else {
    router.navigate(['/login']);
  }
  return false;
};
