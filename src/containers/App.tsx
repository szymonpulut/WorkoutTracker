import React from 'react';

import { WithStyles, withStyles } from '@material-ui/core';

import Layout from 'components/Layout/Layout';

import styles from './AppStyles';

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {}

const App: React.FC<IProps> = ({ classes }: IProps) => {
    return (
        <div className={classes.App}>
            <Layout />
        </div>
    );
};

export default withStyles(styles)(App);
