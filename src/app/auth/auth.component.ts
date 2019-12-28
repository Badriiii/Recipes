import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})

export class AuthComponent {
    isLoginMode = false;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let authObs: Observable<AuthResponseData>;
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.signin(email, password);
        }
        else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(resdata => {
            console.log(resdata);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(errorMessage: string) {
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );
    }
}