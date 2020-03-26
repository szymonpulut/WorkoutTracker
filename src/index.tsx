import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import theme from 'shared/theme';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'store/configureStore';

import App from 'containers/App';
import * as serviceWorker from 'serviceWorker';
import { ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading="Loading redux persist" persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);

serviceWorker.register();
