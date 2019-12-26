import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1), // subscribe to one user and then unsubscribe
            exhaustMap(user => {
                if(!user) { // this will be used for login and signup
                    return next.handle(req);
                }
                
                // for all other req we are appending user token in query param
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
                return next.handle(modifiedReq);
            })) 
    }
}