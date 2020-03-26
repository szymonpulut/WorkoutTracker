/* eslint-disable */
import React from 'react';
import {
    withStyles,
    WithStyles,
    createStyles,
    Theme,
    createPalette,
} from '@material-ui/core';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
// import theme from 'shared/theme';

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
            color: theme.palette.primary.contrastText,
        },
        appBar: {
            top: 'auto',
            backgroundColor: theme.palette.primary.main,
            bottom: 0,
        },
    });

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {}

const BottomHeader: React.FC<IProps> = ({ classes }: IProps) => {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
        null,
    );

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <>
            <BurgerMenu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                handleClose={handleMenuClose}
            />
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuClick}
                        aria-haspopup
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Workout tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default withStyles(styles)(BottomHeader);
