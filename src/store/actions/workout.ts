import * as actionTypes from 'types/actions';
import { IExercise } from 'types/WorkoutRoutine';

export const initDayOne = (): actionTypes.AppActions => {
    return {
        type: actionTypes.INIT_DAY_ONE,
    };
};

export const changeDay = (day: number): actionTypes.AppActions => {
    return {
        type: actionTypes.CHANGE_DAY,
        day,
    };
};

export const addNewExercise = (
    exercise: IExercise,
    day: number,
): actionTypes.AppActions => {
    return {
        type: actionTypes.ADD_NEW_EXERCISE,
        exercise,
        day,
    };
};

export const modifyExercise = (
    exercise: IExercise,
    day: number,
): actionTypes.AppActions => {
    return {
        type: actionTypes.MODIFY_EXERCISE,
        day,
        exercise,
    };
};

export const removeExercise = (
    day: number,
    id: number,
): actionTypes.AppActions => {
    return {
        type: actionTypes.REMOVE_EXERCISE,
        day,
        id,
    };
};

export const addDay = (): actionTypes.AppActions => {
    return {
        type: actionTypes.ADD_DAY,
    };
};

export const removeDay = (day: number): actionTypes.AppActions => {
    return {
        type: actionTypes.REMOVE_DAY,
        day,
    };
};
