import React from 'react';

import {
    withStyles,
    WithStyles,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';

import styles from './ConfirmRemoveDialogStyles';

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {
    handleRemove: () => void;
    setOpen: (value: boolean) => void;
    isOpen: boolean;
    removedType: 'day' | 'exercise';
}

const ConfirmRemoveDialog: React.FC<IProps> = ({
    classes,
    isOpen,
    setOpen,
    handleRemove,
    removedType,
}: IProps) => {
    const handleClose = (success: boolean): void => {
        if (success === false) {
            setOpen(false);
        } else {
            handleRemove();
            setOpen(false);
        }
    };

    let additionalDialogText;
    if (removedType === 'day') {
        additionalDialogText = 'this day';
    } else if (removedType === 'exercise') {
        additionalDialogText = 'this exercise';
    }

    return (
        <Dialog
            open={isOpen}
            onClose={(): void => {
                handleClose(false);
            }}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {`Are you sure you want to remove ${additionalDialogText}?`}
            </DialogTitle>
            <DialogActions className={classes.DialogActions}>
                <Button
                    onClick={(): void => {
                        handleClose(true);
                    }}
                    className={classes.RemoveButton}
                >
                    Remove
                </Button>
                <Button
                    onClick={(): void => {
                        handleClose(false);
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(ConfirmRemoveDialog);
