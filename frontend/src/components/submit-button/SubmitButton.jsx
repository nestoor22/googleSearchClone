import React from 'react';
import { Button } from '@material-ui/core';
import useStyles from './styles';

const SubmitButton = ({ label, disabled, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      className={classes.submitBtn}
      onClick={handleSubmit}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
