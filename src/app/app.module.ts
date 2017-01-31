import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ThreadsService} from './services/threads.service';
import {Action, StoreModule} from '@ngrx/store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './store/application-state';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from './store/actions';

import * as _ from 'lodash';
import {EffectsModule} from '@ngrx/effects';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// Reducer
function storeReducer(
  state: ApplicationState = INITIAL_APPLICATION_STATE, // default value
  action: Action): ApplicationState {

  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(
  state: ApplicationState,
  action: UserThreadsLoadedAction): ApplicationState {

  const userData = action.payload;
  // TODO: Where is userData used?
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = { // storeData is from app-state.ts
    participants: _.keyBy(userData.participants, 'id'),
    messages: _.keyBy(userData.messages, 'id'),
    threads: _.keyBy(userData.threads, 'id')
  };
  // console.log('newState: ', newState.storeData);
  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer),
    EffectsModule.run(LoadThreadsEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
