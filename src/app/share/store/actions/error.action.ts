import { createAction, props } from '@ngrx/store';

export const setErrorAction = createAction(
  '[Error] setError',
  props<{ message: string; messages: string[] }>()
);

export const clearErrorAction = createAction('[Error] clearError');
