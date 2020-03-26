import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppActions } from 'types/actions';
import * as actions from 'store/actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface IMapDispatchToProps {
    onClearAppData: () => void;
}

interface IProps extends IMapDispatchToProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

const BurgerMenu: React.FC<IProps> = ({
    anchorEl,
    open,
    handleClose,
    onClearAppData,
}: IProps) => {
    return (
        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
            <MenuItem
                onClick={(): void => {
                    onClearAppData();
                    handleClose();
                }}
            >
                Clear application data
            </MenuItem>
            <MenuItem
                onClick={(): void => {
                    window.location.reload();
                }}
            >
                Refresh app
            </MenuItem>
        </Menu>
    );
};

const mapDispatchToProps = (
    dispatch: Dispatch<AppActions>,
): IMapDispatchToProps => {
    return {
        onClearAppData: (): void => {
            dispatch(actions.clearStorage());
        },
    };
};

export default connect(null, mapDispatchToProps)(BurgerMenu);
