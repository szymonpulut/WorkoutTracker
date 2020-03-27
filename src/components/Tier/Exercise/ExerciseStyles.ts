import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        chip: {
            width: '90%',
            marginTop: '5px',
        },
    });

export default styles;
