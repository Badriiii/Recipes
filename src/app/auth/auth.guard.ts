import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot)
        : boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1), // emits only the latest value of observable and then completes listening
            map(user => {
                const isAuth = !!user; // returns false incase of undefined or null
                return !isAuth
                    ? this.router.createUrlTree(['/auth']) // if not auth redirect to auth route
                    : isAuth; // else return true(means authGuard will allow user to access url)
            }))
    }
}