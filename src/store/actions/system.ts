import * as actionTypes from 'types/actions';

export const toggleDialog = (
    value?: boolean,
    day?: number,
    tier?: number,
    id?: number,
): actionTypes.AppActions => {
    return {
        type: actionTypes.DIALOG_TOGGLE,
        value,
        day,
        tier,
        id,
    };
};

export const toggleDialogModify = (
    value?: boolean,
    day?: number,
    id?: number,
): actionTypes.AppActions => {
    return {
        type: actionTypes.DIALOG_TOGGLE_MODIFY,
        value,
        day,
        id,
    };
};

export const clearStorage = (): actionTypes.AppActions => {
    return {
        type: actionTypes.CLEAR_STORAGE,
    };
};
