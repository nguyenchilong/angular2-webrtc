import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material/dialog';
import { InfoDialog } from '../../dialogs/info-dialog/info-dialog.component';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent {

    dialogRef: MdDialogRef<InfoDialog>;
    user: Observable<any>;
    @Output() toggleoutput = new EventEmitter();

    constructor(
        private store: Store<any>,
        private authservice: AuthService,
        public dialog: MdDialog,
        ) {
        this.user = this.store.select(store => store.user);
    }

    logoutUser(): void {
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
}
