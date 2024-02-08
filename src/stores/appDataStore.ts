import { createStore } from '@stencil/store';
import { User } from 'firebase/auth';

export const appDataStore = createStore({
  user: undefined as undefined | User,
  uid: undefined as undefined | string,
  isLoggedIn: undefined as undefined | boolean,
  currentEventId: undefined as undefined | string,
  theme: 'synthwave',
});

appDataStore.onChange('user', value => (appDataStore.state.uid = value?.uid));
appDataStore.onChange('uid', value => {
  if (value === undefined) return (appDataStore.state.isLoggedIn = undefined);
  appDataStore.state.isLoggedIn = !!value;
});

export default appDataStore;
