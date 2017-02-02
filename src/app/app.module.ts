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
import {Action, Action, combineReducers, StoreModule} from '@ngrx/store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './store/application-state';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from './store/actions';

import * as _ from 'lodash';
import {EffectsModule} from '@ngrx/effects';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {INITIAL_UI_STATE, UiState} from './store/ui-state';
import {StoreData} from './store/store-data';
import {uiState} from './store/reducers/uiStateReducer';
import {storeData} from './store/reducers/uiStoreDataReducer';

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
    StoreModule.provideStore(combineReducers({
      uiState,
      storeData
    }), INITIAL_APPLICATION_STATE),
    EffectsModule.run(LoadThreadsEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
