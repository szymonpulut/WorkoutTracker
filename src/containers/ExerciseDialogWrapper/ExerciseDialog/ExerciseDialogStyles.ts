import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        DialogActions: {
            margin: theme.spacing(1),
        },
        RemoveButton: {
            textAlign: 'left',
            color: theme.palette.warning.main,
        },
    });

export default styles;
