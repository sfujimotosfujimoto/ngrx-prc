

import {StoreData} from '../store-data';
import {Action} from '@ngrx/store';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';

export function storeData(state: StoreData, action: Action): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(
  state: StoreData,
  action: UserThreadsLoadedAction): StoreData {

  const userData = action.payload;

  return { // storeData is from app-state.ts
    participants: _.keyBy(userData.participants, 'id'),
    messages: _.keyBy(userData.messages, 'id'),
    threads: _.keyBy(userData.threads, 'id')
  };
}
