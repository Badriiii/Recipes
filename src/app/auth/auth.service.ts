import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

// Response payload object
export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient,
        private router: Router) {
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcpwRITlxQI3dmbs5tjBezq2F0ZKUxWM0',
            // the request payload should have the below three prop as per firebase
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData =>
                this.handleAuth(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )));
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcpwRITlxQI3dmbs5tjBezq2F0ZKUxWM0',
            // the request payload should have the below three prop as per firebase
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData =>
                this.handleAuth(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expiryDate = new Date(
            new Date()
                .getTime() // Will give the current time in milli seconds
            +   // appending the time
            +expiresIn * 1000 // converting time to milli seconds
        )
        const user = new User(email, userId, token, expiryDate);;

        this.user.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unexpected error occurs!";
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this account';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator';
                break;
        }

        return throwError(errorMessage);
    }
}