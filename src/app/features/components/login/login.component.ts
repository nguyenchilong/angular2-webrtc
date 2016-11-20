import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

    loginform: FormGroup;
    isloading: boolean = false;

    constructor(
        private authservice: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private restservice: RestService,
        private changeDetectionRef: ChangeDetectorRef) {
        if (this.authservice.isAuthorized) {
            this.router.navigate(['']);
        }
        this.loginform = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    login(): void {
        this.isloading = true;
        this.restservice.authorizeUser(this.loginform.controls['username'].value, this.loginform.controls['password'].value)
            .subscribe(
            (data) => {
                this.isloading = false;
                this.changeDetectionRef.markForCheck();
            },
            (err) => {
                this.isloading = false;
                this.changeDetectionRef.markForCheck();
            }
            );
        this.authservice.setJWT(this.loginform.controls['username'].value);
        this.loginform.controls['password'].setValue('');
        this.router.navigate(['']);
    }
}
