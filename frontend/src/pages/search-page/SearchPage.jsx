import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AppHeader, SearchInputField, SubmitButton } from 'components';

import useStyles from './styles';

const SearchPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [searchItem, setSearchItem] = useState('');

  const handleSearchItemChanges = (event) => {
    setSearchItem(event.target.value);
  };

  const handleSubmit = () => {
    history.push({
      pathname: '/search',
      search: `?q=${searchItem}`,
    });
  };
  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.searchBlock}>
        <SearchInputField
          placeholder={'Search...'}
          value={searchItem}
          handleChange={handleSearchItemChanges}
        />
        <SubmitButton handleSubmit={handleSubmit} label={'Search'} />
      </div>
    </div>
  );
};

export default SearchPage;
