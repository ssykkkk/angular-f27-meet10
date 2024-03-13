import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  errorMessage: string = '';
  errorMessages: string[]=[];
  constructor(
    private store: Store<{ error: { message: string; messages: string[] } }>
  ) {
    this.store
      .select((state) => state.error.message)
      .subscribe((message) => {
        this.errorMessage = message || '';
      });

    this.store
      .select((state) => state.error.messages)
      .subscribe((messages) => {
        this.errorMessages = messages || [];
      });
  }
}
