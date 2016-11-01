import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.css']
})

export class LoginComponent {

    @ViewChild('username') username;
    @ViewChild('password') password;

    constructor(
        private authservice: AuthService,
        private router: Router) {
        if (this.authservice.isAuthorized) {
            this.router.navigate(['']);
        }
    }

    login(): void {
        this.authservice.setJWT(this.username._value);
        this.router.navigate(['']);
    }
}
