import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        root: {
            bottom: 0,
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        title: {
            flexGrow: 1,
            textAlign: 'right',
            color: theme.palette.primary.contrastText,
        },
        appBar: {
            top: 'auto',
            backgroundColor: theme.palette.primary.main,
            bottom: 0,
        },
    });

export default styles;
