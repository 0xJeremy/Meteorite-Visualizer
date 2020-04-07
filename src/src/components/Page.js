import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Deck from './Map';
import DataTable from './DataTable';
import data from '../meteorites_small';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730'
  },
  deck: {
    marginBottom: '8px',
  }
}));

export default function Page() {
  const classes = useStyles();
  const [hoverItem, setHoverItem] = useState(null);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Paper className={classes.paper} style={{minHeight: '70vh'}}>TOGGLES</Paper>
          <Paper className={classes.paper} style={{minHeight: '70vh'}}>MORE TOGGLES</Paper>
        </Grid>
        <Grid item xs={7}>
          <Deck data={data} hoverCallback={setHoverItem} />
          <DataTable data={data} hoverItem={hoverItem} />
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
