import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { User } from '../../../model/user';

@Component({
    selector: 'register-dialog',
    templateUrl: './register-dialog.template.html',
    styleUrls: ['./register-dialog.style.css']
})
export class RegisterDialog {
    regform: FormGroup;
    isvalid: boolean = false;

    user: User = {
        username: '',
        password: '',
        roles: [], // 'ROLE_PROF' or 'ROLE_STUDENT'
        firstname: '',
        lastname: '',
        title: ''
    };

    constructor(public dialogRef: MdDialogRef<RegisterDialog>,
            private store: Store<any>,
            private formBuilder: FormBuilder,
            private RestService: RestService) {
        this.regform = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            title: ['', Validators.required],
            email: ['', Validators.required],
            roles: '',
            pass: ['', Validators.required],
            passConfirm: ['', Validators.required]
        });
        this.regform.get('pass').valueChanges.subscribe(value => {
            if (this.regform.get('pass').value === this.regform.get('passConfirm').value && this.regform.get('pass').value !== '') {
                this.isvalid = true;
            } else {
                this.isvalid = false;
            }
        });
        this.regform.get('passConfirm').valueChanges.subscribe(value => {
            if (this.regform.get('pass').value === this.regform.get('passConfirm').value && this.regform.get('pass').value !== '') {
                this.isvalid = true;
            } else {
                this.isvalid = false;
            }
        });
    }

    register(): void {
        this.user.firstname = this.regform.get('firstName').value;
        this.user.lastname = this.regform.get('lastName').value;
        this.user.username = this.regform.get('email').value;
        this.user.password = this.regform.get('pass').value;
        this.user.title = this.regform.get('title').value;

        //TODO read selected role-value
        if (this.regform.get('roles').value === 'stud') {
            this.user.roles = ['ROLE_STUDENT'];
        } else if (this.regform.get('roles').value === 'prof') {
            this.user.roles = ['ROLE_PROF'];
        } else {
            //TODO
            this.user.roles = ['ROLE_STUDENT'];
        }

        if (this.user.firstname !== '' && this.user.lastname !== '' && this.user.username !== '' && this.user.roles !== [] && this.user.password !== '') {
            this.RestService.createUser(this.user).subscribe(data => {
                console.log(data);
            });
        }
    }

}
