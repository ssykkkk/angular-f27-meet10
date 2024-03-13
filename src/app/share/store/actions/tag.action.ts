import { createAction, props } from '@ngrx/store';

export const setTagAction = createAction(
  '[Tag] set',
  props<{ tag: string }>()
);

export const clearTagAction = createAction('[Tag] clear');
