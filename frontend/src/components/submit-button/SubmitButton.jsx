import React from 'react';
import { Button } from '@material-ui/core';
import useStyles from './styles';

const SubmitButton = ({ label, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Button className={classes.submitBtn} onClick={handleSubmit}>
      {label}
    </Button>
  );
};

export default SubmitButton;
