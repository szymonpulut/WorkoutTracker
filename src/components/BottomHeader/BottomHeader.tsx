import React from 'react';

import {
    withStyles,
    WithStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import BurgerMenu from 'components/BurgerMenu/BurgerMenu';

import styles from './BottomHeaderStyles';

interface IProps extends WithStyles<keyof ReturnType<typeof styles>> {}

const BottomHeader: React.FC<IProps> = ({ classes }: IProps) => {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
        null,
    );

    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
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
