import * as actionTypes from 'types/actions';
import { updateObject } from 'shared/utility';
import { IExercise, IWorkoutRoutine } from 'types/WorkoutRoutine';

export interface IWorkoutState {
    day: number;
    daysCount: number;
    days: IWorkoutRoutine;
}

const initialState: IWorkoutState = { day: 0, daysCount: 0, days: [] };

const changeDay = (
    state: typeof initialState,
    action: actionTypes.ChangeDayAction,
): typeof initialState => {
    const newState = updateObject<typeof initialState>(state, {
        ...state,
        day: action.day,
    });

    return newState;
};

const addDay = (
    state: typeof initialState,
    action: actionTypes.AddDayAction,
): typeof initialState => {
    const newDaysCount = state.daysCount + 1;
    const newDaysArray = {
        ...state.days,
        [newDaysCount]: {
            id: 9,
            day: newDaysCount,
            exercises: [],
        },
    };
    return updateObject(state, {
        ...state,
        daysCount: newDaysCount,
        days: newDaysArray,
    });
};
const initDayOne = (
    state: typeof initialState,
    action: actionTypes.InitDayOneAction,
): typeof initialState => {
    const newAction = {} as actionTypes.AddDayAction;
    return addDay(state, newAction);
};

const removeDay = (
    state: typeof initialState,
    action: actionTypes.RemoveDayAction,
): typeof initialState => {
    const daysCopy = { ...state.days };
    const newDays: IWorkoutRoutine = {};

    /* eslint-disable no-restricted-syntax */
    for (const day of Object.values(daysCopy)) {
        let dayNumber = day.day;
        if (dayNumber !== action.day) {
            if (dayNumber > action.day) dayNumber -= 1;
            newDays[dayNumber] = day;
            newDays[dayNumber].day = dayNumber;
        }
    }
    /* eslint-enable no-restricted-syntax */

    const newState = Object.assign(state, {
        daysCount: state.daysCount - 1,
        days: newDays,
    });

    return newState;
};

const addNewExercise = (
    state: typeof initialState,
    action: actionTypes.AddNewExerciseAction,
): typeof initialState => {
    let newExercises: IExercise[];
    const exerciseId = state?.days[action.day]?.exercises?.findIndex(
        (exercise) => {
            return exercise.id === action.exercise.id;
        },
    );

    if (exerciseId !== -1) {
        newExercises = [
            ...state?.days[action.day]?.exercises?.slice(0, exerciseId),
            action.exercise,
            ...state?.days[action.day]?.exercises?.slice(exerciseId + 1),
        ];
    } else {
        newExercises = state?.days[action.day]?.exercises?.concat([
            action.exercise,
        ]);
    }

    return {
        ...state,
        days: {
            ...state.days,
            [action.day]: {
                ...state.days[action.day],
                exercises: newExercises,
            },
        },
    };
};

const removeExercise = (
    state: typeof initialState,
    action: actionTypes.RemoveExerciseAction,
): typeof initialState => {
    const newExercises = state.days[action.day].exercises.filter((element) => {
        return element.id !== action.id;
    });

    const d = state.days[action.day];

    const newDay = updateObject<typeof d>(d, {
        ...d,
        exercises: [...newExercises],
    });

    const newDays = updateObject<typeof state.days>(state.days, {
        ...state.days,
        [action.day]: newDay,
    });

    const newState = updateObject<typeof state>(state, {
        ...state,
        days: newDays,
    });

    return newState;
};

const modifyExercise = (
    state: typeof initialState,
    action: actionTypes.ModifyExerciseAction,
): typeof initialState => {
    const exerciseId = state.days[action.day]?.exercises?.findIndex(
        (exercise: IExercise) => {
            return exercise.id === action.exercise.id;
        },
    );

    const newExercises = [...state.days[action.day].exercises];

    newExercises[exerciseId] = {
        id: action.exercise.id,
        tier: action.exercise.tier,
        type: {
            ...action.exercise.type,
        },
        result: {
            ...action.exercise.result,
        },
    };

    const d = state.days[action.day];

    const newDay = updateObject<typeof d>(d, {
        ...d,
        exercises: [...newExercises],
    });

    const newDays = updateObject<typeof state.days>(state.days, {
        ...state.days,
        [action.day]: newDay,
    });

    const newState = updateObject<typeof state>(state, {
        ...state,
        days: newDays,
    });

    return newState;
};

const reducer = (
    state = initialState,
    action: actionTypes.AppActions,
): typeof initialState => {
    switch (action.type) {
        case actionTypes.INIT_DAY_ONE:
            return initDayOne(state, action);
        case actionTypes.CHANGE_DAY:
            return changeDay(state, action);
        case actionTypes.ADD_NEW_EXERCISE:
            return addNewExercise(state, action);
        case actionTypes.MODIFY_EXERCISE:
            return modifyExercise(state, action);
        case actionTypes.REMOVE_EXERCISE:
            return removeExercise(state, action);
        case actionTypes.ADD_DAY:
            return addDay(state, action);
        case actionTypes.REMOVE_DAY:
            return removeDay(state, action);
        default:
            return state;
    }
};

export default reducer;
