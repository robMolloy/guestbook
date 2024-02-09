import { createStore } from '@stencil/store';
import { User } from 'firebase/auth';
import { eventDbEntrySchema } from '../utils/firestoreUtils';
import { z } from 'zod';

export const appDataStore = createStore({
  status: 'loading' as 'loading' | 'logged_out' | 'logged_in_capturing' | 'logged_in_choose_event',
  user: undefined as undefined | User,
  uid: undefined as undefined | string,
  isLoggedIn: undefined as undefined | boolean,
  currentEvent: undefined as undefined | z.infer<typeof eventDbEntrySchema>,
  currentEventId: undefined as undefined | string,
  theme: 'synthwave',
});

appDataStore.onChange('user', value => (appDataStore.state.uid = value?.uid));
appDataStore.onChange('uid', value => {
  if (value === undefined) return (appDataStore.state.isLoggedIn = undefined);
  appDataStore.state.isLoggedIn = !!value;
});
appDataStore.onChange('currentEvent', value => {
  if (value === undefined) return (appDataStore.state.currentEventId = undefined);
  appDataStore.state.currentEventId = value.id;
});
appDataStore.on('set', () => {
  if (appDataStore.state.isLoggedIn === undefined) appDataStore.state.status = 'loading';
  if (appDataStore.state.isLoggedIn === false) appDataStore.state.status = 'logged_out';

  if (appDataStore.state.isLoggedIn === true && !appDataStore.state.currentEventId)
    appDataStore.state.status = 'logged_in_choose_event';
  if (appDataStore.state.isLoggedIn === true && !!appDataStore.state.currentEventId)
    appDataStore.state.status = 'logged_in_capturing';
});

export default appDataStore;
