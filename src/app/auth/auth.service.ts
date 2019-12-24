import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Response payload object
interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
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
    }

}