import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'login-view-component',
    template: `
    <div class="loginwrapper">
        <login-component></login-component>
    </div>
    `,
    styleUrls: ['./login-view.style.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginViewComponent {

}
