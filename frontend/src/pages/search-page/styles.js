import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  searchBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foundedItem: {
    width: '40%',
    marginBottom: '40px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
  },
});

export default useStyles;
