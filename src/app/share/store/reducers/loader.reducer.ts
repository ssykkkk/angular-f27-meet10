import { createReducer, on } from '@ngrx/store';
import { startLoaderAction, stopLoaderAction } from '../actions/loader.action';

const initialState = false;
export const loaderReduser = createReducer(
  initialState,
  on(startLoaderAction, (): boolean => {
    return true;
  }),
  on(stopLoaderAction, (): boolean => {
    return false;
  })
);
