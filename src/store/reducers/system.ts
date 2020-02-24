import * as actionTypes from 'types/actions';

const initialState = {
    dialogOpen: false,
    dialogOpenExercise: {
        day: 0,
        tier: 0,
        id: 0,
    },
    dialogModify: false,
    dialogModifyExercise: {
        day: 0,
        id: 0,
    },
};

const dialogToggle = (
    state: typeof initialState,
    action: actionTypes.DialogToggleAction,
): typeof initialState => {
    let newState = {};
    if (Object.prototype.hasOwnProperty.call(action, 'value')) {
        if (action.value) {
            newState = {
                ...state,
                dialogOpen: true,
                dialogOpenExercise: {
                    day: action.day,
                    tier: action.tier,
                },
            };
        } else {
            newState = {
                ...state,
                dialogOpen: false,
                dialogModify: false,
                dialogOpenExercise: {
                    day: 0,
                    tier: 0,
                },
            };
        }
    } else {
        newState = {
            ...state,
            dialogOpen: !state.dialogOpen,
        };
    }
    return newState as typeof initialState;
};

const dialogToggleModify = (
    state: typeof initialState,
    action: actionTypes.DialogToggleModifyAction,
): typeof initialState => {
    let newState = {};
    if (Object.prototype.hasOwnProperty.call(action, 'value')) {
        if (action.value) {
            newState = {
                ...state,
                dialogModifyExercise: {
                    day: action.day,
                    id: action.id,
                },
                dialogModify: true,
                dialogOpen: true,
            };
        } else {
            newState = {
                ...state,
                dialogModifyExercise: {
                    day: 0,
                    id: 0,
                },
                dialogModify: false,
                dialogOpen: true,
            };
        }
    } else {
        newState = {
            ...state,
            dialogModify: !state.dialogModify,
        };
    }
    return newState as typeof initialState;
};

const reducer = (
    state = initialState,
    action: actionTypes.AppActions,
): typeof initialState => {
    switch (action.type) {
        case actionTypes.DIALOG_TOGGLE_MODIFY:
            return dialogToggleModify(state, action);
        case actionTypes.DIALOG_TOGGLE:
            return dialogToggle(state, action);
        default:
            return state;
    }
};

export default reducer;
