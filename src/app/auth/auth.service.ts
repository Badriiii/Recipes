import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Response payload object
interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcpwRITlxQI3dmbs5tjBezq2F0ZKUxWM0',
            // the request payload should have the below three prop as per firebase
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorResponse => {
                let errorMessage = "An unexpected error occurs!";
                if (!errorResponse.error || !errorResponse.error.error) {
                    return throwError(errorMessage);
                }

                switch (errorResponse.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'Email already exists';
                }

                return throwError(errorMessage);
            }))
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcpwRITlxQI3dmbs5tjBezq2F0ZKUxWM0',
            // the request payload should have the below three prop as per firebase
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorResponse => {
                let errorMessage = "An unexpected error occurs!";
                if (!errorResponse.error || !errorResponse.error.error) {
                    return throwError(errorMessage);
                }

                switch (errorResponse.error.error.message) {
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
            }))
    }
}