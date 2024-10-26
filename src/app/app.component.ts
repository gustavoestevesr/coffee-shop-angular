import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    styles: [],
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'angular-shop';
}
