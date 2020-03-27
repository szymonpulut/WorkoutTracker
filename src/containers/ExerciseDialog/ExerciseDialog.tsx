import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import { IExercise, IWorkoutRoutine } from 'types/WorkoutRoutine';
import { AppState } from 'store/configureStore';
import { AppActions } from 'types/actions';

import {
    withStyles,
    WithStyles,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import ConfirmRemoveDialog from 'components/ConfirmRemoveDialog/ConfirmRemoveDialog';

import styles from './ExerciseDialogStyles';

interface IMapStateToProps {
    days: IWorkoutRoutine;
    dialogOpen: boolean;
    dialogModify: boolean;
    dialogOpenExercise: {
        day: number;
        tier: number;
        id: number;
    };
    dialogModifyExercise: {
        day: number;
        id: number;
    };
}

interface IMapDispatchToProps {
    onAddNewExercise: (exercise: IExercise, day: number) => void;
    onRemoveExercise: (day: number, id: number) => void;
    onDialogToggle: (
        value?: boolean,
        day?: number,
        tier?: number,
        id?: number,
    ) => void;
}

interface IProps
    extends IMapStateToProps,
        IMapDispatchToProps,
        WithStyles<keyof ReturnType<typeof styles>> {
    day: number;
}

const ExerciseDialog: React.FC<IProps> = ({
    onAddNewExercise,
    onRemoveExercise,
    day,
    days,
    dialogOpen,
    dialogModify,
    dialogOpenExercise,
    dialogModifyExercise,
    onDialogToggle,
    classes,
}: IProps) => {
    let exerciseId: number;
    if (dialogModify) {
        exerciseId = dialogModifyExercise.id;
    } else if (days[day]?.exercises?.length > 0) {
        exerciseId = days[day].exercises.length;
    } else {
        exerciseId = 0;
    }

    const [formData, setFormData] = React.useState({
        exerciseName: '',
        shortDesc: '',
        repCount: 0,
        seriesCount: 0,
        weight: 0,
        tier: 0,
        id: 0,
    });

    const clearFormData = (): void => {
        setFormData({
            exerciseName: '',
            shortDesc: '',
            repCount: 0,
            seriesCount: 0,
            weight: 0,
            id: 0,
            tier: 0,
        });
    };

    React.useEffect(() => {
        if (dialogModify) {
            const currentExercises = days[day].exercises;
            const currentExerciseId = currentExercises.findIndex((exercise) => {
                return exercise.id === dialogModifyExercise.id;
            });
            const currentExercise = currentExercises[currentExerciseId];

            setFormData({
                exerciseName: currentExercise.type.name,
                shortDesc: currentExercise.result.shortDesc,
                repCount: currentExercise.result.repCount,
                seriesCount: currentExercise.result.seriesCount,
                weight: currentExercise.result.repWeight,
                id: dialogModifyExercise.id,
                tier: currentExercise.tier,
            });
        }
    }, [dialogModify]);

    const handleClose = (success: boolean): void => {
        onDialogToggle(false);

        if (success) {
            let tempTier = 0;
            if (formData.tier === 0) {
                tempTier = dialogOpenExercise.tier;
            } else {
                tempTier = formData.tier;
            }

            onAddNewExercise(
                {
                    id: exerciseId,
                    tier: tempTier,
                    type: {
                        name: formData.exerciseName,
                        id: 1,
                    },
                    result: {
                        shortDesc: formData.shortDesc,
                        repCount: formData.repCount,
                        repWeight: formData.weight,
                        seriesCount: formData.seriesCount,
                        amrap: false,
                        metric: true,
                    },
                },
                day,
            );
        }
    };

    const [
        confirmRemoveExerciseDialog,
        setConfirmRemoveExerciseDialog,
    ] = React.useState(false);

    const handleExerciseRemove = (): void => {
        onRemoveExercise(day, formData.id);
        handleClose(false);
    };

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement>,
        stateId: string,
    ): void => {
        setFormData({
            ...formData,
            [stateId]: event.target.value,
        });
    };

    React.useEffect(() => {
        if (!dialogOpen) {
            clearFormData();
        }
    }, [dialogOpen]);

    const removeButton = (
        <Button
            className={classes.RemoveButton}
            onClick={(): void => {
                setConfirmRemoveExerciseDialog(true);
            }}
        >
            Remove
        </Button>
    );

    return (
        <div>
            <ConfirmRemoveDialog
                isOpen={confirmRemoveExerciseDialog}
                setOpen={(value): void => {
                    setConfirmRemoveExerciseDialog(value);
                }}
                handleRemove={(): void => {
                    handleExerciseRemove();
                }}
                removedType="exercise"
            />
            <Dialog
                open={dialogOpen}
                onClose={(): void => {
                    handleClose(false);
                }}
                aria-labelledby="form-dialog-title"
                className={classes.root}
            >
                <DialogTitle id="form-dialog-title">
                    {dialogModify ? 'Modify exercise' : 'Add new exercise'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="exerciseName"
                        value={formData.exerciseName}
                        onChange={(event): void => {
                            handleFormChange(
                                event as ChangeEvent<HTMLInputElement>,
                                'exerciseName',
                            );
                        }}
                        label="Exercise Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="shortDesc"
                        value={formData.shortDesc}
                        onChange={(event): void => {
                            handleFormChange(
                                event as ChangeEvent<HTMLInputElement>,
                                'shortDesc',
                            );
                        }}
                        label="Description or notes"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="repCount"
                        value={formData.repCount}
                        onChange={(event): void => {
                            handleFormChange(
                                event as ChangeEvent<HTMLInputElement>,
                                'repCount',
                            );
                        }}
                        label="Repetitions count"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="repSeries"
                        value={formData.seriesCount}
                        onChange={(event): void => {
                            handleFormChange(
                                event as ChangeEvent<HTMLInputElement>,
                                'seriesCount',
                            );
                        }}
                        label="Series count"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="weight"
                        value={formData.weight}
                        onChange={(event): void => {
                            handleFormChange(
                                event as ChangeEvent<HTMLInputElement>,
                                'weight',
                            );
                        }}
                        label="Weight lifted"
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={classes.DialogActions}>
                    {dialogModify ? removeButton : null}

                    <div style={{ flexGrow: 1 }} />
                    <Button
                        onClick={(): void => {
                            handleClose(false);
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(): void => {
                            handleClose(true);
                        }}
                        color="primary"
                    >
                        {dialogModify ? 'Modify' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
        days: state.workout.days,
        dialogOpen: state.system.dialogOpen,
        dialogModify: state.system.dialogModify,
        dialogOpenExercise: state.system.dialogOpenExercise,
        dialogModifyExercise: state.system.dialogModifyExercise,
    };
};

const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onAddNewExercise: (exercise: IExercise, day: number): void => {
            dispatch(actions.addNewExercise(exercise, day));
        },
        onRemoveExercise: (day: number, id: number): void => {
            dispatch(actions.removeExercise(day, id));
        },
        onDialogToggle: (
            value?: boolean,
            day?: number,
            tier?: number,
            id?: number,
        ): void => {
            dispatch(actions.toggleDialog(value, day, tier, id));
        },
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog),
);
