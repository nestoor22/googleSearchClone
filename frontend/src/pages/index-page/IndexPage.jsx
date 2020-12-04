import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AppHeader, SearchInputField, SubmitButton } from 'components';

import useStyles from './styles';

const IndexPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchItemChanges = (event) => {
    setSearchItem(event.target.value);
  };

  const handleSubmit = () => {
    history.push({
      pathname: '/index',
      search: `?q=${searchItem}`,
    });
  };

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.searchBlock}>
        <SearchInputField
          placeholder={'Enter a website url for indexing...'}
          value={searchItem}
          handleChange={handleSearchItemChanges}
        />
        <SubmitButton handleSubmit={handleSubmit} label={'Index'} />
      </div>
    </div>
  );
};

export default IndexPage;
