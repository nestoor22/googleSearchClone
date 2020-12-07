import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {
  AppHeader,
  CustomSelect,
  SearchInputField,
  SubmitButton,
} from 'components';

import runIndexing from 'api/runIndexing';

import useStyles from './styles';

const IndexPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const recursionDepthVariants = [1, 2, 3];

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [recursionDepth, setRecursionDepth] = useState(1);

  const handleSearchItemChanges = (event) => {
    setSearchItem(event.target.value);
  };

  const handleRecursionDepthChanges = (event) => {
    setRecursionDepth(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    history.push({
      pathname: '/index',
      search: `?q=${searchItem}&max_recursion=${recursionDepth}`,
    });
    runIndexing(setResult, setLoading);
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
        <CustomSelect
          label={'Recursion depth'}
          value={recursionDepth}
          variants={recursionDepthVariants}
          handleChange={handleRecursionDepthChanges}
        />
        <SubmitButton
          disabled={!searchItem || loading}
          handleSubmit={handleSubmit}
          label={'Index'}
        />
      </div>
      <div className={classes.indexingResultsBlock}>
        {loading && (
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        )}
        {result && <div>{result.message || '-'}</div>}
      </div>
    </div>
  );
};

export default IndexPage;
