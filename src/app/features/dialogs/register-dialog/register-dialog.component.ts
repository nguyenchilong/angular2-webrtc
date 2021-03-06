import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { User } from '../../../model/user';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

@Component({
    selector: 'register-dialog',
    templateUrl: './register-dialog.template.html',
    styleUrls: ['./register-dialog.style.css']
})
export class RegisterDialog {
    regform: FormGroup;
    isvalid: boolean = false;
    snackbarref: MdSnackBarRef<any>;

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
        private RestService: RestService,
        private snackBar: MdSnackBar) {
        this.regform = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
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
        this.user.title = '';
        this.user.roles = ['ROLE_STUDENT'];

        if (this.user.firstname !== '' && this.user.lastname !== '' && this.user.username !== '' && this.user.roles !== [] && this.user.password !== '') {
            this.RestService.createUser(this.user).subscribe(data => {
                if (data.success) {
                    this.dialogRef.close();
                    this.snackBar.open('User successfully created', '', {
                        duration: 3000
                    });
                } else {
                    this.snackbarref = this.snackBar.open('Something went wrong:\n' + data.form_error.errors[0], 'Ok');
                }

            });
        }
    }

}
