import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestService } from '../../../services/rest.service';

@Component({
    selector: 'passwordchange-component',
    templateUrl: './passwordchange.template.html',
    styleUrls: ['./passwordchange.style.css']
})
export class PasswordChangeComponent {

    constructor(private store: Store<any>,
            private rest: RestService) {
    }

    changePassword(oldPw: string = '', newPw1: string = '', newPw2: string = ''): void {
        console.log('#old=' + oldPw);
        console.log('#new1=' + newPw1);
        console.log('#new2=' + newPw2);
        if (newPw1 === newPw2) {
            this.rest.updateUserPassword(oldPw, newPw1).subscribe(
                success => {
                    console.log('ok updatePassword()');
                },
                err => {
                    console.log('err updatePassword()');
                }
            );
        }
        this.rest.createSlot(2, 'my first slot', 50, 'my comment of my first slot');
    }

}
