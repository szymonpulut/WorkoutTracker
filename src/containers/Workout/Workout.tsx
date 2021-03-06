import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IconButton, WithStyles, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { IWorkoutRoutine } from 'types/WorkoutRoutine';
import { AppState } from 'store/configureStore';
import { AppActions } from 'types/actions';
import * as actions from 'store/actions';

import Tier from 'components/Tier/Tier';
import ConfirmRemoveDialog from 'components/ConfirmRemoveDialog/ConfirmRemoveDialog';
import ExerciseDialogWrapper from 'containers/ExerciseDialogWrapper/ExerciseDialogWrapper';

import styles from './WorkoutStyles';

interface IMapStateToProps {
    day: number;
    days: IWorkoutRoutine;
    daysCount: number;
    showExerciseDialog: boolean;
}

interface IMapDispatchToProps {
    onInitDayOne: () => void;
    onChangeDay: (day: number) => void;
    onRemoveDay: (day: number) => void;
}

interface IProps
    extends IMapStateToProps,
        IMapDispatchToProps,
        WithStyles<keyof ReturnType<typeof styles>> {}

const Workout: React.FC<IProps> = ({
    day,
    days,
    daysCount,
    onInitDayOne,
    onChangeDay,
    onRemoveDay,
    showExerciseDialog,
    classes,
}: IProps) => {
    // Initialise day 1 if array is empty or undefined - on first launch
    const firstDay = days[1];
    React.useEffect(() => {
        if (firstDay === undefined) {
            onInitDayOne();
            onChangeDay(1);
        }
    }, [firstDay]);

    const currentDayRoutine = days[day];

    const [showRemoveDayDialog, setShowRemoveDayDialog] = React.useState(false);

    const handleRemoveDay = (): void => {
        let onlyOneDay = false;
        if (daysCount <= 1) onlyOneDay = true;

        let newDay = 0;
        if (!onlyOneDay) {
            if (day - 1 > 0) newDay = day - 1;
            else newDay = day;
        } else {
            newDay = 1;
            onInitDayOne();
        }

        onRemoveDay(day);
        onChangeDay(newDay);
    };

    const confirmRemoveDialog = showRemoveDayDialog ? (
        <ConfirmRemoveDialog
            isOpen={showRemoveDayDialog}
            setOpen={(value): void => {
                setShowRemoveDayDialog(value);
            }}
            handleRemove={handleRemoveDay}
            removedType="day"
        />
    ) : null;

    const exerciseDialogWrapper = showExerciseDialog ? (
        <ExerciseDialogWrapper day={day} />
    ) : null;

    return (
        <div className={classes.Workout}>
            {confirmRemoveDialog}
            {exerciseDialogWrapper}
            <Tier
                day={day}
                tierNumber={1}
                exercises={currentDayRoutine?.exercises}
            />
            <Tier
                day={day}
                tierNumber={2}
                exercises={currentDayRoutine?.exercises}
            />
            <Tier
                day={day}
                tierNumber={3}
                exercises={currentDayRoutine?.exercises}
            />
            <h3>Additional: </h3>
            <div style={{ flexGrow: 1 }} />
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(): void => {
                    setShowRemoveDayDialog(true);
                }}
            >
                <DeleteIcon className={classes.DeleteIcon} />
            </IconButton>
        </div>
    );
};

const mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
        day: state.workout.day,
        daysCount: state.workout.daysCount,
        days: state.workout.days,
        showExerciseDialog: state.system.dialogOpen,
    };
};

const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onInitDayOne: (): void => {
            dispatch(actions.initDayOne());
        },
        onChangeDay: (day: number): void => {
            dispatch(actions.changeDay(day));
        },
        onRemoveDay: (day: number): void => {
            dispatch(actions.removeDay(day));
        },
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Workout),
);
