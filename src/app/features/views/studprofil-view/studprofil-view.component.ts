import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'studprofil-view-component',
    templateUrl: './studprofil-view.template.html',
    styleUrls: ['./studprofil-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudprofilViewComponent {

    user: Observable<UserLogin>;
    constructor(private store: Store<any>) {
        this.user = this.store.select(store => store.user);
    }
}
