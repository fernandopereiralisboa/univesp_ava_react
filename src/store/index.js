import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

import client from '../services/client';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  store.subscribe(() => {
    const state = store.getState();

    if (state.authentication && state.authentication.credentials &&
        !state.authentication.isAuthenticating) {
      client.setCredentials(state.authentication.credentials);
    }
  });

  return { store, persistor };
};

export default configureStore;