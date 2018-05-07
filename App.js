import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import configureStore from './src/store/index';
import Loading from './src/components/Loading';
import Root from './src/root';

const { persistor, store } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);

export default App;