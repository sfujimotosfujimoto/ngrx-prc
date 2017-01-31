import { Injectable } from '@angular/core';
import {ThreadsService} from '../../services/threads.service';
import {Actions, Effect} from '@ngrx/effects';
import {LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction} from '../actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) {

  }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug('action received')
    .switchMap(() => this.threadsService.loadUserThreads())
    .debug('data received via the http req')
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

}
