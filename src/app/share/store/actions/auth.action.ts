import { createAction, props } from '@ngrx/store';

export const checkAuthAction = createAction(
  '[Auth] check',
);

export const loginAction = createAction(
  '[Auth] login',
  props<{ email: string; password: string }>()
);

export const registerAction = createAction(
  '[Auth] register',
  props<{ email: string; password: string, username: string }>()
);

export const setTokenAction = createAction(
  '[Auth] setToken',
  props<{ token: string; username: string; id: number }>()
);

export const logoutAction = createAction('[Auth] logout');
