import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { RestService } from '../../../services/rest.service';
import { Router } from '@angular/router';

import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { InfoDialog } from '../../dialogs/info-dialog/info-dialog.component';
import { UserLogin } from '../../../model/user-login';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

    dialogRef: MdDialogRef<InfoDialog>;
    user: Observable<UserLogin>;
    @Output()
    toggleoutput = new EventEmitter();
    routerPath: Observable<any>;

    constructor(
        private store: Store<any>,
        private authservice: AuthService,
        private dialog: MdDialog,
        private restservice: RestService,
        private router: Router
    ) {
        this.user = this.store.select(store => store.user);
        this.routerPath = this.store.select(store => store.router);
    }

    logoutUser(): void {
        this.restservice.logoutUser();
        this.authservice.signout();
    }

    // Emits Output if nav istoggled
    toggle(): void {
        this.toggleoutput.emit();
    }

    openDialog(e) {
        let config: MdDialogConfig = { disableClose: false };
        this.dialogRef = this.dialog.open(InfoDialog, config);
        // when closing dialog
        this.dialogRef.afterClosed().subscribe(result => {
        });
    }

    back(): void {
        this.router.navigate(['']);
    }

}
