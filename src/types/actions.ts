import { IExercise } from './WorkoutRoutine';

export const ADD_NEW_EXERCISE = 'ADD_NEW_EXERCISE';
export const MODIFY_EXERCISE = 'MODIFY_EXERCISE';
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE';
export const INIT_DAY_ONE = 'INIT_DAY_ONE';
export const ADD_DAY = 'ADD_DAY';
export const REMOVE_DAY = 'REMOVE_DAY';
export const ADD_RESULT = 'ADD_RESULT';
export const DEL_RESULT = 'DEL_RESULT';
export const CHANGE_DAY = 'CHANGE_DAY';

export const DIALOG_TOGGLE = 'DIALOG_TOGGLE';
export const DIALOG_TOGGLE_MODIFY = 'DIALOG_TOGGLE_MODIFY';

export interface DialogToggleAction {
    type: typeof DIALOG_TOGGLE;
    value?: boolean;
    day?: number;
    tier?: number;
    id?: number;
}

export interface DialogToggleModifyAction {
    type: typeof DIALOG_TOGGLE_MODIFY;
    value?: boolean;
    day?: number;
    id?: number;
}

export interface InitDayOneAction {
    type: typeof INIT_DAY_ONE;
}

export interface ChangeDayAction {
    type: typeof CHANGE_DAY;
    day: number;
}

export interface AddNewExerciseAction {
    type: typeof ADD_NEW_EXERCISE;
    exercise: IExercise;
    day: number;
}

export interface ModifyExerciseAction {
    type: typeof MODIFY_EXERCISE;
    day: number;
    exercise: IExercise;
}

export interface RemoveExerciseAction {
    type: typeof REMOVE_EXERCISE;
    day: number;
    id: number;
}

export interface AddDayAction {
    type: typeof ADD_DAY;
}

export interface RemoveDayAction {
    type: typeof REMOVE_DAY;
    day: number;
}

export type ExerciseActionTypes =
    | AddNewExerciseAction
    | ModifyExerciseAction
    | RemoveExerciseAction;

export type DayActionTypes =
    | ChangeDayAction
    | InitDayOneAction
    | AddDayAction
    | RemoveDayAction;

export type DialogActionTypes = DialogToggleModifyAction | DialogToggleAction;

export type AppActions =
    | DayActionTypes
    | ExerciseActionTypes
    | DialogActionTypes;
