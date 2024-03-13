import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { IFullUser } from '../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { setErrorAction } from '../actions/error.action';
import * as AuthAction from '../actions/auth.action';
import { IError } from '../../interfaces/error.interface';
import { Router } from '@angular/router';
interface IData {
  email: string;
  password: string;
}

interface IDataReg extends IData {
  username: string;
}
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] login'),
      switchMap((action: IData) => {
        return this.authService.login(action.email, action.password).pipe(
          map((response: IFullUser | IError) => {
            if ('user' in response) {
              const { token, username, id } = response.user;
              this.router.navigate(['/']);
              return AuthAction.setTokenAction({ token, username, id });
            } else {
              return AuthAction.logoutAction();
            }
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            const message = errorResponse.error.message || '';
            const messages = errorResponse.error.errors?.body || [];
            return of(setErrorAction({ message, messages }));
          })
        );
      })
    )
  );

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] register'),
      switchMap((action: IDataReg) => {
        return this.authService
          .register(action.username, action.email, action.password)
          .pipe(
            map((response: IFullUser | IError) => {
              if ('user' in response) {
                const { token, username, id } = response.user;
                this.router.navigate(['/']);
                return AuthAction.setTokenAction({ token, username, id });
              } else {
                return AuthAction.logoutAction();
              }
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              const message = errorResponse.error.message || '';
              const messages = errorResponse.error.errors?.body || [];
              return of(setErrorAction({ message, messages }));
            })
          );
      })
    )
  );

  currentUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] check'),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((response: IFullUser | IError) => {
            if ('user' in response) {
              const { token, username, id } = response.user;
              this.router.navigate(['/']);
              return AuthAction.setTokenAction({ token, username, id });
            } else {
              return AuthAction.logoutAction();
            }
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            const message = errorResponse.error.message || '';
            const messages = errorResponse.error.errors?.body || [];
            return of(setErrorAction({ message, messages }));
          })
        );
      })
    )
  );
}
