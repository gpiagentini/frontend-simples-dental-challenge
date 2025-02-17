import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const albumsRequestInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = environment.baseUrl;
  const url = `${baseUrl}${req.url}`;

  const newReq = req.clone({ url: url });
  return next(newReq);
};
