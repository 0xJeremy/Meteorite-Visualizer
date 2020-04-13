import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  paper: {
    marginBottom: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '30px',
    backgroundColor: '#242730'
  },
  text: {
    paddingBottom: '8px'
  },
  green: {
    color: '#48c74e'
  },
  red: {
    color: '#e03131',
    marginRight: '8px'
  },
  outline_blue: {
    borderColor: '#4fbbd6',
    height: '100%'
  },
  outline_green: {
    borderColor: '#48c74e',
    height: '100%'
  },
  outline_red: {
    borderColor: '#e03131',
    height: '100%'
  },
});

export default function TogglePanel(props) {
  const classes = useStyles();
  const [snackMore, setSnackMore] = React.useState(false);
  const [snackLess, setSnackLess] = React.useState(false);
  const more = props.more;
  const less = props.less;

  const clickLess = () => {
    setSnackLess(true);
    setSnackMore(false);
    less();
  }

  const closeLess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackLess(false);
  }

  const clickMore = () => {
    setSnackMore(true);
    setSnackLess(false);
    more();
  }

  const closeMore = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackMore(false);
  }


  return (
    <Paper className={classes.paper} style={{minHeight: '30vh'}}>
      <div className={classes.text} >viz options</div>

      <Button className={classes.red} classes={{outlined: classes.outline_red}} variant="outlined" onClick={clickLess} >Load Less Data</Button>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={clickMore} >Load More Data</Button>


      <Snackbar open={snackMore} autoHideDuration={6000} onClose={closeMore}>
        <Alert onClose={closeMore} severity="success">
          Loading more data!
        </Alert>
      </Snackbar>
      <Snackbar open={snackLess} autoHideDuration={6000} onClose={closeLess}>
        <Alert onClose={closeLess} severity="error">
          Loading less data!
        </Alert>
      </Snackbar>

    </Paper>
  );
}
