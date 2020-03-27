import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IconButton, WithStyles, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import * as actions from 'store/actions';
import { AppActions } from 'types/actions';
import { IExercise } from 'types/WorkoutRoutine';

import Exercise from 'components/Tier/Exercise/Exercise';

import styles from './TierStyles';

interface IMapDispatchToProps {
    onToggleDialogOpen: (day: number, tier: number, id: number) => void;
}

interface IProps
    extends IMapDispatchToProps,
        WithStyles<keyof ReturnType<typeof styles>> {
    tierNumber: number;
    exercises: Array<IExercise>;
    day: number;
}

const Tier: React.FC<IProps> = ({
    tierNumber,
    exercises,
    onToggleDialogOpen,
    day,
    classes,
}: IProps) => {
    const thisTierExercises = exercises?.filter((exercise) => {
        return exercise.tier === tierNumber;
    });

    return (
        <div className={classes.Tier} key={tierNumber}>
            <div>
                <h3 className={classes.TierName}>
                    <IconButton
                        aria-label="add"
                        onClick={(): void => {
                            onToggleDialogOpen(day, tierNumber, 1);
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    {`Tier ${tierNumber}`}
                </h3>
            </div>
            {thisTierExercises?.map((exercise) => {
                return (
                    <Exercise
                        key={exercise.id}
                        exerciseId={exercise.id}
                        name={exercise.type.name}
                        day={day}
                        tier={exercise.tier}
                        repCount={exercise.result.repCount}
                        repWeight={exercise.result.repWeight}
                        seriesCount={exercise.result.seriesCount}
                    />
                );
            })}
        </div>
    );
};

const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onToggleDialogOpen: (day: number, tier: number, id: number): void => {
            dispatch(actions.toggleDialog(true, day, tier, id));
        },
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Tier));
