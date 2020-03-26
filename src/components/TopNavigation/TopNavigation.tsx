/* eslint-disable */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppActions } from 'types/actions';
import * as actions from 'store/actions';

import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { AppBar, Tabs, Tab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppState } from 'store/configureStore';

const styles = () => ({
    root: {
        width: '100%',
    },
});

interface IMapDispatchToProps {
    onChangeDay: (day: number) => void;
    onAddDay: () => void;
}

interface IMapStateToProps {
    currentDay: number;
    daysCount: number;
}

interface IProps
    extends WithStyles<typeof styles>,
        IMapDispatchToProps,
        IMapStateToProps {}

const a11yProps = (index: any) => {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const TopNavigation: React.FC<IProps> = ({
    onChangeDay,
    currentDay,
    daysCount,
    onAddDay,
}: IProps) => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue !== currentDay) {
            onChangeDay(newValue);
        }
    };

    const handleAddDay = () => {
        onAddDay();
        onChangeDay(daysCount + 1);
    };

    const dayTabs = [];
    for (let i = 1; i <= daysCount; i++) {
        const label = `Day ${i}`;
        dayTabs.push(<Tab value={i} label={label} {...a11yProps(i)} key={i} />);
    }

    return (
        <AppBar position="static" color="default">
            <Tabs
                value={currentDay}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="workout days list"
            >
                {dayTabs}
                <IconButton
                    aria-label="add workout day"
                    value={dayTabs.length + 2}
                    onClick={handleAddDay}
                >
                    <AddIcon />
                </IconButton>
            </Tabs>
        </AppBar>
    );
};

const mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
        currentDay: state.workout.day,
        daysCount: state.workout.daysCount,
    };
};

const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onChangeDay: (day: number): void => {
            dispatch(actions.changeDay(day));
        },
        onAddDay: (): void => {
            dispatch(actions.addDay());
        },
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TopNavigation),
);
