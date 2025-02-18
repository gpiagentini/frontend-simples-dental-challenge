import { HttpInterceptorFn } from '@angular/common/http';
import { LoginData } from '../objects/LoginData';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

/*
  Interceptor responsible for checking user authentication.
  If user is not authenticated, then return to the login page.
*/
export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  if (localStorage.getItem('loginData') !== null) {
    const loginData: LoginData = JSON.parse(localStorage.getItem('loginData')!);
    const expired: boolean = loginData.expirationTime < new Date().getTime();
    if (expired) {
      console.warn('Sessão expirada! Redirecionando para login...');
      localStorage.removeItem('loginData');
      router.navigate(['/login']);
      return new Observable();
    }
    return next(req);
  }
  router.navigate(['/login']);
  return new Observable();
}
