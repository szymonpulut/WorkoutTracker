import React from 'react';

import { Chip, withStyles, WithStyles, createStyles } from '@material-ui/core';

import * as actions from 'store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppActions } from 'types/actions';

const styles = (): ReturnType<typeof createStyles> =>
    createStyles({
        chip: {
            width: '90%',
            marginTop: '5px',
        },
    });

interface IMapDispatchToProps {
    onToggleDialogModify: (day: number, exerciseId: number) => void;
}

interface IProps
    extends WithStyles<keyof ReturnType<typeof styles>>,
        IMapDispatchToProps {
    name: string;
    tier: number;
    repCount: number;
    repWeight: number;
    seriesCount: number;
    metric?: boolean;
    exerciseId: number;
    day: number;
}

const Exercise: React.FC<IProps> = ({
    name,
    repCount,
    repWeight,
    seriesCount,
    metric = true,
    classes,
    exerciseId,
    onToggleDialogModify,
    day,
}: IProps) => {
    const clickHandler = (): void => {
        onToggleDialogModify(day, exerciseId);
    };

    return (
        <Chip
            size="medium"
            label={`${name} | ${repCount} reps with ${repWeight}${
                metric ? 'kg' : 'lbs'
            } in ${seriesCount} series`}
            onClick={clickHandler}
            className={classes.chip}
        />
    );
};
const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onToggleDialogModify: (day: number, exerciseId: number): void => {
            dispatch(actions.toggleDialogModify(true, day, exerciseId));
        },
    };
};
export default withStyles(styles)(connect(null, mapDispatchToProps)(Exercise));
