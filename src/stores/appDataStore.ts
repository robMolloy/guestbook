import { createStore } from '@stencil/store';
import { User } from 'firebase/auth';
import { eventDbEntrySchema } from '../utils/firestoreUtils';
import { z } from 'zod';

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
] as const;

export const appDataStore = createStore({
  status: 'loading' as 'loading' | 'logged_out' | 'logged_in_capturing' | 'logged_in_choose_event',
  user: undefined as undefined | null | User,
  uid: undefined as undefined | null | string,
  isLoggedIn: undefined as undefined | boolean,
  currentEvent: undefined as undefined | z.infer<typeof eventDbEntrySchema>,
  currentEventId: undefined as undefined | string,
  availableThemes: themes,
  theme: 'synthwave' as (typeof themes)[number],
});

appDataStore.onChange('user', user => {
  appDataStore.state.uid = user === null ? null : user?.uid;
  appDataStore.state.isLoggedIn = user === undefined ? undefined : !!user?.uid;
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
