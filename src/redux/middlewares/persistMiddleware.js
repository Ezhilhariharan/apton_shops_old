// import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage/session'

// export const prConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// export const sessionPersistConfig = {
//   key: 'rootSession',
//   storage: sessionStorage,
// }

import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'authSelector',
    'whatsAppSelector',
    'surveyCampaginSelector',
    'createSurveySelector',
  ],
};
