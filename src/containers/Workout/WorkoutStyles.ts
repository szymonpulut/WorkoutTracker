import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        Workout: {
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'column',
            height: '100%',
        },
        DeleteIcon: {
            color: theme.palette.warning.main,
        },
    });
export default styles;
