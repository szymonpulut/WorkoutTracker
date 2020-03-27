import React from 'react';

import {
    withStyles,
    WithStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';

import { IExerciseFormData } from 'types/System';

import ConfirmRemoveDialog from 'components/ConfirmRemoveDialog/ConfirmRemoveDialog';
import Form from './Form/Form';

import styles from './ExerciseDialogStyles';

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {
    displayRemovalConfirm: boolean;
    setDisplayRemovalConfirm: (value: boolean) => void;
    handleFormChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        stateId: string,
    ) => void;
    handleExerciseRemove: () => void;
    handleClose: (success: boolean) => void;
    isModify: boolean;
    isOpen: boolean;
    formData: IExerciseFormData;
}

const ExerciseDialog: React.FC<IProps> = ({
    classes,
    displayRemovalConfirm,
    setDisplayRemovalConfirm,
    handleFormChange,
    handleExerciseRemove,
    handleClose,
    isModify,
    isOpen,
    formData,
}: IProps) => {
    const removeButton = (
        <Button
            className={classes.RemoveButton}
            onClick={(): void => {
                setDisplayRemovalConfirm(true);
            }}
        >
            Remove
        </Button>
    );

    return (
        <>
            <ConfirmRemoveDialog
                isOpen={displayRemovalConfirm}
                setOpen={(value): void => {
                    setDisplayRemovalConfirm(value);
                }}
                handleRemove={handleExerciseRemove}
                removedType="exercise"
            />
            <Dialog
                open={isOpen}
                onClose={(): void => {
                    handleClose(false);
                }}
                aria-labelledby="form-dialog-title"
                className={classes.root}
            >
                <DialogTitle id="form-dialog-title">
                    {isModify ? 'Modify exercise' : 'Add new exercise'}
                </DialogTitle>
                <DialogContent>
                    <Form
                        formData={formData}
                        handleFormChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions className={classes.DialogActions}>
                    {isModify ? removeButton : null}

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
                        {isModify ? 'Modify' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default withStyles(styles)(ExerciseDialog);
