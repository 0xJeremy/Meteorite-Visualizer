import React from 'react';
import DeckGL from '@deck.gl/react';
import { makeStyles } from '@material-ui/core/styles';
import {StaticMap} from 'react-map-gl';
import MAPBOX_ACCESS_TOKEN from './APIKey';

const useStyles = makeStyles({
  root: {
    minHeight: '70vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: '16px',
  },
});

const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};


export default function Deck(props) {
  const classes = useStyles();
  const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = props;

  return (
    <div className={classes.root}>
      <DeckGL initialViewState={initialViewState} controller={true} >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={mapStyle}/>
      </DeckGL>
    </div>
  );
}
