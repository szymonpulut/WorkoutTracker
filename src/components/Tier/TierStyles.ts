import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme): ReturnType<typeof createStyles> =>
    createStyles({
        Tier: {
            width: '100%',
            textAlign: 'center',
        },
        TierName: {
            textAlign: 'center',
        },
    });

export default styles;
