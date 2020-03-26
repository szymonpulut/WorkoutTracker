import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface IProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

const BurgerMenu: React.FC<IProps> = ({
    anchorEl,
    open,
    handleClose,
}: IProps) => {
    return (
        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Clear application data</MenuItem>
            <MenuItem onClick={handleClose}>Refresh</MenuItem>
        </Menu>
    );
};

export default BurgerMenu;
