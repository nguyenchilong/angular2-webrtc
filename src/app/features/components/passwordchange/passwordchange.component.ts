import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'passwordchange-component',
    templateUrl: './passwordchange.template.html',
    styleUrls: ['./passwordchange.style.css']
})
export class PasswordChangeComponent {

    constructor(private store: Store<any>) {
    }

}
