import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Deck from './Map';
import DataTable from './DataTable';
import MassChart from './MassChart';
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
  const MapState = React.createRef();

  function updateHoverFromTable(d) {
    setHoverItem(d);
    MapState.current.setGlobalHoverObject(d);
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Paper className={classes.paper} style={{minHeight: '70vh'}}>TOGGLES</Paper>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>MORE TOGGLES</Paper>
        </Grid>
        <Grid item xs={7}>
          <Deck data={data} hoverItem={hoverItem} hoverCallback={setHoverItem} ref={MapState}/>
          <DataTable data={data} hoverItem={hoverItem} hoverCallback={updateHoverFromTable} />
        </Grid>
        <Grid item xs={3}>
          <MassChart data={data} />
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 2</Paper>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
