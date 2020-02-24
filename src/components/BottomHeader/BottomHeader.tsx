/* eslint-disable */
import React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme: Theme) =>
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
        },
        appBar: {
            top: 'auto',
            backgroundColor: '#FF5964',
            bottom: 0,
        },
    });

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {}

const BottomHeader: React.FC<IProps> = ({ classes }: IProps) => {
    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Workout tracker
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(BottomHeader);
