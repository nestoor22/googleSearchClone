import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '48px',
    backgroundColor: '#68b9f5',
    display: 'flex',
    padding: '0px 40px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navigation: {
    width: '10%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  navigationLink: {
    color: '#020844',
    textDecoration: 'none',
  },
});

export default useStyles;
