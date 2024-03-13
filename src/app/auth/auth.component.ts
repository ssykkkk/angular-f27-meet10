import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { loginAction, logoutAction, registerAction } from '../share/store/actions/auth.action';
import { Router } from '@angular/router';
import { setErrorAction } from '../share/store/actions/error.action';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  hide = true;

  reactiveForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  regForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store,
  ) {}

  changeShowPass(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }

  sumbitReactiveForm() {
    if (this.reactiveForm.status === 'VALID') {
      this.store.dispatch(
        loginAction({
          email: this.reactiveForm.value.email,
          password: this.reactiveForm.value.password,
        })
      );
    } else {
      this.store.dispatch(
        setErrorAction({
          message: "Заповніть обов'язкові поля",
          messages: [],
        })
      );
    }
    setTimeout(() => {
      this.store.dispatch(
        setErrorAction({
          message: '',
          messages: [],
        })
      );
    }, 5000);
  }

  sumbitRegForm() {
    if (this.regForm.status === 'VALID') {
       this.store.dispatch(
         registerAction({
           username: this.regForm.value.username,
           email: this.regForm.value.email,
           password: this.regForm.value.password,
         })
       );
    } else {
      this.store.dispatch(
        setErrorAction({
          message: "Заповніть обов'язкові поля",
          messages: [],
        })
      );
    }

    setTimeout(() => {
      this.store.dispatch(
        setErrorAction({
          message: '',
          messages: [],
        })
      );
    }, 5000);
  }
}
