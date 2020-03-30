import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import { IExercise, IWorkoutRoutine } from 'types/WorkoutRoutine';
import { IExerciseFormData } from 'types/System';
import { AppState } from 'store/configureStore';
import { AppActions } from 'types/actions';

import ExerciseDialog from './ExerciseDialog/ExerciseDialog';

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

interface IProps extends IMapStateToProps, IMapDispatchToProps {
    day: number;
}

const ExerciseDialogWrapper: React.FC<IProps> = ({
    onAddNewExercise,
    onRemoveExercise,
    day,
    days,
    dialogOpen,
    dialogModify,
    dialogOpenExercise,
    dialogModifyExercise,
    onDialogToggle,
}: IProps) => {
    const defaultFormData: IExerciseFormData = {
        exerciseName: '',
        shortDesc: '',
        repCount: 0,
        seriesCount: 0,
        weight: 0,
        tier: 0,
        id: 0,
    };

    const [formData, setFormData] = React.useState<IExerciseFormData>(
        defaultFormData,
    );
    const [
        confirmRemoveExerciseDialog,
        setConfirmRemoveExerciseDialog,
    ] = React.useState(false);

    const clearFormData = (): void => setFormData(defaultFormData);

    const getExerciseId = (): number => {
        // If an exercise is being currently modified, return its id
        // else return length of current exercises array - it will be new element's ID
        if (dialogModify) {
            return dialogModifyExercise.id;
            // eslint-disable-next-line no-else-return
        } else if (days[day]?.exercises?.length > 0) {
            return days[day].exercises.length;
        }

        return 0;
    };

    const handleFormChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        stateId: string,
    ): void => {
        setFormData({
            ...formData,
            [stateId]: event.target.value,
        });
    };

    const handleAddExercise = (
        dayNumber: number,
        id: number,
        tier: number,
        name: string,
        shortDesc: string,
        repCount: number,
        repWeight: number,
        seriesCount: number,
    ): void => {
        onAddNewExercise(
            {
                id,
                tier,
                type: {
                    name,
                    id: 1,
                },
                result: {
                    shortDesc,
                    repCount,
                    repWeight,
                    seriesCount,
                    amrap: false,
                    metric: true,
                },
            },
            dayNumber,
        );
    };

    const handleClose = (success: boolean): void => {
        onDialogToggle(false);

        if (success) {
            const exerciseId = getExerciseId();

            let tempTier = 0;
            if (formData.tier === 0) {
                tempTier = dialogOpenExercise.tier;
            } else {
                tempTier = formData.tier;
            }

            handleAddExercise(
                day,
                exerciseId,
                tempTier,
                formData.exerciseName,
                formData.shortDesc,
                formData.repCount,
                formData.weight,
                formData.seriesCount,
            );
        }
    };

    const handleExerciseRemove = (): void => {
        onRemoveExercise(day, formData.id);
        handleClose(false);
    };

    const autoFillForm = (): void => {
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
            id: currentExercise.id,
            tier: currentExercise.tier,
        });
    };

    // Auto fill form when modifying an existing exercise
    React.useEffect((): void => {
        if (dialogModify) {
            autoFillForm();
        }
    }, [dialogModify]);

    // Clear form data when dialog is closed
    React.useEffect(() => {
        if (!dialogOpen) {
            clearFormData();
        }
    }, [dialogOpen]);

    return (
        <ExerciseDialog
            displayRemovalConfirm={confirmRemoveExerciseDialog}
            setDisplayRemovalConfirm={setConfirmRemoveExerciseDialog}
            handleFormChange={handleFormChange}
            handleExerciseRemove={handleExerciseRemove}
            handleClose={handleClose}
            isModify={dialogModify}
            isOpen={dialogOpen}
            formData={formData}
        />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExerciseDialogWrapper);
