import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        App: {
            display: 'flex',
            flexGrow: 1,
            flexFlow: 'column',
        },
    });

export default styles;
