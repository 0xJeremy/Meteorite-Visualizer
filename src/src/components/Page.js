import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Deck from './Map';
import DataTable from './DataTable';
import MassChart from './MassChart';
import ClassChart from './ClassChart';
import TogglePanel from './TogglePanel';
import InfoBox from './InfoBox';
import initial_data from '../meteorites_medium';
import more_data from '../meteorites_medium_ext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: '8px',
    marginRight: '8px',
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
  const [selectedData, setSelectedData] = useState(null);
  const [timeline, setTimeline] = useState([1950, 2020])
  const [totalData, setTotalData] = useState(initial_data)
  const [dispData, setDispData] = useState(initial_data)
  const MapState = React.createRef();

  function filter_timeline(values) {
    setTimeline(values);
    setDispData(totalData.filter(d => (d.year >= values[0] && d.year <= values[1])));
  }

  function load_more_data() {
    setTotalData(initial_data.concat(more_data));
    setDispData(totalData);
  }

  function load_less_data() {
    setDispData(initial_data);
  }

  function updateMapHover(d) {
    setSelectedData(d);
    if(MapState.current !== null) {
      MapState.current.setSelectedData([d]);
    }
  }

  return (
    <div>
      <Grid container spacing={1}>

        <Grid item xs={9}>
          <Deck data={dispData} selectedData={selectedData} hoverCallback={setSelectedData} ref={MapState}/>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TogglePanel more={load_more_data} less={load_less_data} timeline={timeline} setTimeline={filter_timeline} />
            </Grid>

            <Grid item xs={9}>
              <DataTable data={dispData} selectedData={selectedData} hoverCallback={updateMapHover} selectedData={selectedData} />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={3}>
          <MassChart data={dispData} selectedData={selectedData} setSelectedData={updateMapHover} />
          <ClassChart data={dispData} selectedData={selectedData} />
          <Paper className={classes.paper} style={{minHeight: '31vh'}}>GRAPH 3</Paper>
        </Grid>

      </Grid>

      {/*<InfoBox />*/}

    </div>
  );
}
