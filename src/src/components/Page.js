import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Deck from './Map';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '16px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730'
  },
  deck: {
    marginBottom: '16px',
  }
}));

export default function Page() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper} style={{minHeight: '70vh'}}>TOGGLES</Paper>
          <Paper className={classes.paper} style={{minHeight: '70vh'}}>MORE TOGGLES</Paper>
        </Grid>
        <Grid item xs={7}>
          <Deck />
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>RAW DATA</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 1</Paper>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 2</Paper>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
