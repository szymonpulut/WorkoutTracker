import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
// import { store } from 'store/configureStore';
import { createShallow } from '@material-ui/core/test-utils';
import { Chip } from '@material-ui/core';
import configureStore from 'redux-mock-store';

import Exercise from './Exercise';

const initialState = {};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('TopNavigation', () => {
    let shallow;

    beforeEach(() => {
        shallow = createShallow();
    });

    it('renders Exercise properly with all props', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Exercise
                    exerciseId={1}
                    name="exerciseName"
                    day={2}
                    tier={3}
                    repCount={4}
                    repWeight={5}
                    seriesCount={6}
                />
            </Provider>,
        );

        expect(wrapper.find("[name='exerciseName']")).toHaveLength(1);
        expect(wrapper.find('[day=2]')).toHaveLength(1);
        expect(wrapper.find('[tier=3]')).toHaveLength(1);
        expect(wrapper.find('[repCount=4]')).toHaveLength(1);
        expect(wrapper.find('[repWeight=5]')).toHaveLength(1);
        expect(wrapper.find('[seriesCount=6]')).toHaveLength(1);
    });
});
