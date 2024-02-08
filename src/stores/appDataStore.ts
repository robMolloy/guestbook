import { createStore } from '@stencil/store';
import { User } from 'firebase/auth';
import { eventDbEntrySchema } from '../utils/firestoreUtils';
import { z } from 'zod';

export const appDataStore = createStore({
  user: undefined as undefined | User,
  uid: undefined as undefined | string,
  isLoggedIn: undefined as undefined | boolean,
  currentEvent: undefined as undefined | z.infer<typeof eventDbEntrySchema>,
  theme: 'synthwave',
});

appDataStore.onChange('user', value => (appDataStore.state.uid = value?.uid));
appDataStore.onChange('uid', value => {
  if (value === undefined) return (appDataStore.state.isLoggedIn = undefined);
  appDataStore.state.isLoggedIn = !!value;
});

export default appDataStore;
