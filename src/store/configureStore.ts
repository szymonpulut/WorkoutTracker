import { createStore, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import workoutReducer from 'store/reducers/workout';
import systemReducer from 'store/reducers/system';

import * as actionTypes from 'types/actions';

/* eslint-disable @typescript-eslint/no-explicit-any */
const composeEnhancers =
    (process.env.NODE_ENV === 'development'
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null) || compose;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
const allReducers = combineReducers({
    workout: workoutReducer,
    system: systemReducer,
} as any) as any;

const rootReducer = (
    state: any,
    action: any,
): ReturnType<typeof allReducers> => {
    if (action.type === actionTypes.CLEAR_STORAGE) {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }

    return allReducers(state, action);
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const persistConfig = {
    key: 'root',
    storage: localStorage,
    stateReconciler: autoMergeLevel1,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const persistedReducer = persistReducer(persistConfig, rootReducer as any);
/* eslint-enable @typescript-eslint/no-explicit-any */

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer, composeEnhancers());

/* eslint-disable @typescript-eslint/no-explicit-any */
export const persistor = persistStore(store as any);
/* eslint-enable @typescript-eslint/no-explicit-any */
