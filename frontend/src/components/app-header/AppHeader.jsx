import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const AppHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav className={classes.navigation}>
        <Link className={classes.navigationLink} to="/search">
          Search
        </Link>
        <Link className={classes.navigationLink} to="/index">
          Index
        </Link>
      </nav>
    </div>
  );
};

export default AppHeader;
