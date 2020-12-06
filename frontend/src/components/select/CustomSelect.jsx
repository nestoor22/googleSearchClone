import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import useStyles from './styles';

const CustomSelect = ({ label, variants, value, handleChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.selectWrapper}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        classes={{ root: classes.selectRoot }}
        labelId="select-label"
        value={value}
        onChange={handleChange}
      >
        {variants.map((el, index) => (
          <MenuItem key={index} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
