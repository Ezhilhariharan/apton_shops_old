// import {applyMiddleware,combineReducers,compose } from 'redux';
// import { legacy_createStore as createStore} from 'redux';
// import thunk from 'redux-thunk';
// // import logger from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import rootReducer from "./rootReducer";
// import {prConfig } from './middlewares/persistMiddleware';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const masterReducer = combineReducers(rootReducer);
// const pReducer = persistReducer(prConfig, masterReducer);
// const middleware = applyMiddleware(thunk);
// const store = createStore(pReducer, composeEnhancers(middleware));
// const persistor = persistStore(store);
// export { persistor, store };

import { applyMiddleware, compose } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'

import reducers from './rootReducer'
import { persistConfig } from './middlewares/persistMiddleware'
import authMiddleware from './middlewares/authMiddleware'

const componseEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

const persistedReducer = persistReducer(persistConfig, reducers)
const middlewares = [thunk, authMiddleware]

export const store = createStore(
  persistedReducer,
  componseEnhancers(applyMiddleware(...middlewares))
)

export const configureStore = cb => {

  const persistor = persistStore(store, {}, () => {
    cb({ store, persistor })
  })
}