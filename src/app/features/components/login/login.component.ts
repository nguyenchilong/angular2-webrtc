import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'login-component',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {

    @ViewChild('username') username;
    @ViewChild('username') password;
    loginform: FormGroup;

    constructor(
        private authservice: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private restservice: RestService) {
        if (this.authservice.isAuthorized) {
            this.router.navigate(['']);
        }
        this.loginform = this.formBuilder.group({
            email: '',
            password: ''
        });
    }

    login(): void {
        this.restservice.authorizeUser(this.loginform.value.email, this.loginform.value.password)
        .subscribe(data => console.log(data._body.token));
        this.authservice.setJWT(this.loginform.value.email);
        this.router.navigate(['']);
    }
}
