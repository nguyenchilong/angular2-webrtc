import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'passwordchange-component',
    templateUrl: './passwordchange.template.html',
    styleUrls: ['./passwordchange.style.css']
})
export class PasswordChangeComponent {

    passwordGroup: FormGroup;

    constructor(private store: Store<any>,
        private rest: RestService,
        private formBuilder: FormBuilder

    ) {
        this.passwordGroup = this.formBuilder.group({
            oldPassword: '',
            newPassword1: '',
            newPassword2: ''
        });
    }

    changePassword(): void {
        if (this.passwordGroup.controls['newPassword1'].value === this.passwordGroup.controls['newPassword2'].value) {
            this.rest.updateUserPassword(this.passwordGroup.controls['oldPassword'].value, this.passwordGroup.controls['newPassword1'].value).subscribe(
                success => {
                    console.log('ok updatePassword()');
                },
                err => {
                    console.log('err updatePassword()');
                }
            );
        }
        this.passwordGroup.controls['oldPassword'].value = '';
        this.passwordGroup.controls['newPassword1'].value = '';
        this.passwordGroup.controls['newPassword2'].value = '';
    }

}
