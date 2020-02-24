import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IWorkoutRoutine } from 'types/WorkoutRoutine';
import { AppState } from 'store/configureStore';
import { AppActions } from 'types/actions';
import * as actions from 'store/actions';

import Tier from 'components/Tier/Tier';
import ExerciseDialog from 'containers/ExerciseDialog/ExerciseDialog';

import styles from './Workout.module.scss';

interface IMapStateToProps {
    day: number;
    days: IWorkoutRoutine;
    daysCount: number;
}

interface IMapDispatchToProps {
    onInitDayOne: () => void;
    onChangeDay: (day: number) => void;
}

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

const Workout: React.FC<IProps> = ({
    day,
    days,
    daysCount,
    onInitDayOne,
    onChangeDay,
}: IProps) => {
    // Initialise day 1 if array is empty or undefined - on first launch
    React.useEffect(() => {
        if (days[1] === undefined) {
            onInitDayOne();
            onChangeDay(daysCount + 1);
        }
    }, []);

    const currentDayRoutine = days[day];

    return (
        <div className={styles.Workout}>
            <ExerciseDialog day={day} />
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
        </div>
    );
};

const mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
        day: state.workout.day,
        daysCount: state.workout.daysCount,
        days: state.workout.days,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
