import React from 'react';

import { TextField } from '@material-ui/core';

interface IProps {
    formData: any;
    handleFormChange: any;
}

const Form: React.FC<IProps> = ({ formData, handleFormChange }: IProps) => {
    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                id="exerciseName"
                value={formData.exerciseName}
                onChange={(event): void => {
                    handleFormChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        'exerciseName',
                    );
                }}
                label="Exercise Name"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="shortDesc"
                value={formData.shortDesc}
                onChange={(event): void => {
                    handleFormChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        'shortDesc',
                    );
                }}
                label="Description or notes"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="repCount"
                value={formData.repCount}
                onChange={(event): void => {
                    handleFormChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        'repCount',
                    );
                }}
                label="Repetitions count"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="repSeries"
                value={formData.seriesCount}
                onChange={(event): void => {
                    handleFormChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        'seriesCount',
                    );
                }}
                label="Series count"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="weight"
                value={formData.weight}
                onChange={(event): void => {
                    handleFormChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        'weight',
                    );
                }}
                label="Weight lifted"
                type="number"
                fullWidth
            />
        </>
    );
};

export default Form;
