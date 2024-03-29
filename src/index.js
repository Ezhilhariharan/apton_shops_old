// import React from "react"
// import { Provider } from "react-redux"
// import AppContainer from "./AppContainer"
// import { PersistGate } from "redux-persist/integration/react"
// import { store, persistor } from "../src/redux/store"
// import { createRoot } from 'react-dom/client'

// const AppProvider = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <AppContainer />
//       </PersistGate>
//     </Provider>
//   )
// }

// createRoot(document.getElementById('root')).render(<AppProvider />)

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './redux/store';
import { createRoot } from 'react-dom/client';

import AppContainer from './AppContainer';
// import SpinnerOverlay from 'components/SpinnerOverlay'
import initApiServices from '@utils/initApiServices';

const App = () => {
  const [store, setStore] = useState(false);
  const [persistor, setPersistor] = useState(false);

  useEffect(() => {
    configureStore(({ store: newStore, persistor: newPersistor }) => {
      initApiServices(newStore);
      setStore(newStore);
      setPersistor(newPersistor);
    });
  }, []);

  return store && persistor ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  ) : (
    <></>
    // <SpinnerOverlay visible={true} />
  );
};

createRoot(document.getElementById('root')).render(<App />);
