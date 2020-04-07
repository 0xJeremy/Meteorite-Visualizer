import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DeckGL from '@deck.gl/react';
import { withStyles } from '@material-ui/styles';
import {StaticMap} from 'react-map-gl';
import {ScatterplotLayer} from '@deck.gl/layers';
import {MapView} from '@deck.gl/core';
import MAPBOX_ACCESS_TOKEN from './APIKey';

const styles = theme => ({
  root: {
    minHeight: '70vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: '16px',
  },
});

const MAP_VIEW = new MapView({repeat: true});
const INITIAL_VIEW = {
  longitude: -35,
  latitude: 36.7,
  zoom: 1.8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      hoveredObject: null,
      expandedObjects: null,
    };
    this.data = props.data;
  }

  getLayer() {
    const {data = this.data} = this.props;
    return new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.exits),
      getFillColor: d => [255, 140, 0],
      getLineColor: d => [0, 0, 0],
    });
  }
  
  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DeckGL
          layers={this.getLayer()}
          views={MAP_VIEW}
          initialViewState={INITIAL_VIEW}
          controller={{dragRotate: false}}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}

Deck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deck);
