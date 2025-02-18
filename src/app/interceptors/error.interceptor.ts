import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/*
  Interceptor responsible for logging any request errors.
*/
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      error.log(error);
      snackBar.open('Erro ao realizar a requisição!', 'Fechar', { duration: 2000, });
      return throwError(() => error);
    })
  );
};
