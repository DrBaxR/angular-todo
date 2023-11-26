import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    auth.redirectToKeycloak();
    return false;
  }
};
