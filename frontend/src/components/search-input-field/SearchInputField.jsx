import React from 'react';

import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const SearchInputField = ({ placeholder, value, handleChange }) => {
  const classes = useStyles();

  return (
    <Input
      disableUnderline={true}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize={'small'} />
        </InputAdornment>
      }
      classes={{
        root: classes.inputRoot,
      }}
    />
  );
};

export default SearchInputField;
