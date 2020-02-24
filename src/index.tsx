import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'store/configureStore';

import App from 'containers/App';
import * as serviceWorker from 'serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading="Loading redux persist" persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.register();
