import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAuthAction } from './share/store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
  
export class AppComponent {
  title = 'angular-rounting';
  constructor(private store: Store) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || null;
      if (token) {
        this.store.dispatch(checkAuthAction());
      }
    }
  }
}
