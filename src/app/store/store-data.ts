
import {Participant} from '../../../shared/model/participant';
import {Message} from '../../../shared/model/message';
import {Thread} from '../../../shared/model/thread';

export interface StoreData {

  participants: {[key: number]: Participant};

  threads: {[key: number]: Thread};

  messages: {[key: number]: Message};


}

export const INITIAL_STORE_DATA: StoreData = {

  threads: {},
  messages: {},
  participants: {}
}
