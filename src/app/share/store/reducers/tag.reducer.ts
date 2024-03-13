import { createReducer, on } from '@ngrx/store';

import { clearTagAction, setTagAction } from '../actions/tag.action';

const initialState = '';
export const tagReduser = createReducer(
  initialState,
  on(setTagAction, (state, action): string => {
    return action.tag;
  }),
  on(clearTagAction, (): string => {
    return '';
  })
);
