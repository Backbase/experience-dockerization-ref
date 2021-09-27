import { Component } from '@angular/core';

@Component({
  selector: 'bb-example',
  template: `<bb-root></bb-root>
    <nav>
      <ul>
        <li><a routerLink="./first-component" routerLinkActive="active">First Component</a></li>
        <li><a routerLink="./second-component" routerLinkActive="active">Second Component</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet> `,
})
export class AppComponent {}
