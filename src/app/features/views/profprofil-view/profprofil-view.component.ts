import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'profprofil-view-component',
    templateUrl: './profprofil-view.template.html',
    styleUrls: ['./profprofil-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfprofilViewComponent {

    user: Observable<UserLogin>;

    constructor(private store: Store<any>) {
        this.user = this.store.select(store => store.user);
    }

}
