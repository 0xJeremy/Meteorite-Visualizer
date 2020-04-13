import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Deck from './Map';
import DataTable from './DataTable';
import MassChart from './MassChart';
import TogglePanel from './TogglePanel';
import InfoBox from './InfoBox';
import initial_data from '../meteorites_medium';
import more_data from '../meteorites_medium_ext';

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
  const [timeline, setTimeline] = useState([1950, 2020])
  const [data, setData] = useState(initial_data)
  const MapState = React.createRef();

  function filter_timeline(values) {
    setTimeline(values);
    setData(initial_data.filter(d => (d.year > values[0] && d.year < values[1])));
  }

  function load_more_data() {
    setData(initial_data.concat(more_data));
  }

  function load_less_data() {
    setData(initial_data);
  }

  function updateHoverFromTable(d) {
    setHoverItem(d);
    MapState.current.setGlobalHoverObject(d);
  }

  return (
    <div>
      <Grid container spacing={1}>

        <Grid item xs={9}>
          <Deck data={data} hoverItem={hoverItem} hoverCallback={setHoverItem} ref={MapState}/>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TogglePanel more={load_more_data} less={load_less_data} timeline={timeline} setTimeline={filter_timeline} />
            </Grid>

            <Grid item xs={9}>
              <DataTable data={data} hoverItem={hoverItem} hoverCallback={updateHoverFromTable} />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={3}>
          <MassChart data={data} hoverItem={hoverItem} />
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 2</Paper>
          <Paper className={classes.paper} style={{minHeight: '30vh'}}>GRAPH 3</Paper>
        </Grid>

      </Grid>

      <InfoBox />

    </div>
  );
}
