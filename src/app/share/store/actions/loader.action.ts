import { createAction } from '@ngrx/store';

export const startLoaderAction = createAction('[Loader] start');

export const stopLoaderAction = createAction(
  '[Loader] stop'
);
