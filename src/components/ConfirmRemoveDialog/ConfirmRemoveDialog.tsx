import React from 'react';

import {
    withStyles,
    WithStyles,
    createStyles,
    Theme,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        root: {},
        DialogActions: {
            margin: theme.spacing(1),
        },
        RemoveButton: {
            textAlign: 'left',
            color: 'red',
        },
    });

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
        <div>
            <Dialog
                open={isOpen}
                onClose={(): void => {
                    handleClose(false);
                }}
                aria-labelledby="form-dialog-title"
                className={classes.root}
            >
                <DialogTitle id="form-dialog-title">
                    {/* eslint-disable-next-line  react/jsx-one-expression-per-line */}
                    Are you sure you want to remove {additionalDialogText}?
                </DialogTitle>
                <DialogActions className={classes.DialogActions}>
                    <Button
                        onClick={(): void => {
                            handleClose(true);
                        }}
                        color="primary"
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
        </div>
    );
};

export default withStyles(styles)(ConfirmRemoveDialog);
