import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';


@Component({
    selector: 'passwordchange-component',
    templateUrl: './passwordchange.template.html',
    styleUrls: ['./passwordchange.style.css']
})
export class PasswordChangeComponent {

    passwordGroup: FormGroup;
    samePasswords: boolean = false;
    snackbarref: MdSnackBarRef<any>;

    constructor(private store: Store<any>,
        private rest: RestService,
        private formBuilder: FormBuilder,
        private changeDetectionRef: ChangeDetectorRef,
        private snackBar: MdSnackBar,
    ) {
        this.passwordGroup = this.formBuilder.group({
            oldPassword: '',
            newPassword1: '',
            newPassword2: ''
        });
        this.passwordGroup.controls['newPassword1'].valueChanges.subscribe(value => {
            if (this.passwordGroup.controls['newPassword1'].value === this.passwordGroup.controls['newPassword2'].value
                && this.passwordGroup.controls['newPassword1'].value !== '') {
                this.samePasswords = true;
            } else {
                this.samePasswords = false;
            }
        });
        this.passwordGroup.controls['newPassword2'].valueChanges.subscribe(value => {
            if (this.passwordGroup.controls['newPassword1'].value === this.passwordGroup.controls['newPassword2'].value
                && this.passwordGroup.controls['newPassword1'].value !== '') {
                this.samePasswords = true;
            } else {
                this.samePasswords = false;
            }
        });
    }

    changePassword(): void {
        if (this.passwordGroup.controls['newPassword1'].value === this.passwordGroup.controls['newPassword2'].value) {
            this.rest.updateUserPassword(this.passwordGroup.controls['oldPassword'].value, this.passwordGroup.controls['newPassword1'].value).subscribe(
                success => {
                    console.log('ok updatePassword()');
                    this.clearInputs();
                    if (success.success) {
                        this.snackBar.open('Password successfully changed', '', {
                            duration: 3000
                        });
                    } else {
                        this.snackBar.open('Password was not changed', '', {
                            duration: 3000
                        });
                    }

                },
                err => {
                    console.log('err updatePassword()');
                    this.clearInputs();
                    this.snackBar.open('Password was not changed', '', {
                        duration: 3000
                    });
                }
            );
        }
    }

    clearInputs(): void {
        this.passwordGroup.controls['oldPassword'].setValue('');
        this.passwordGroup.controls['newPassword1'].setValue('');
        this.passwordGroup.controls['newPassword2'].setValue('');
        this.changeDetectionRef.markForCheck();
    }

}
