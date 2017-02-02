

import {USER_THREADS_LOADED_ACTION} from '../actions';
import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {Action} from '@ngrx/store';
export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {


    default:
      return state;
  }
}
