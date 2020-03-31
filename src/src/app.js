import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import {createAction} from 'redux-actions';
import {processKeplerglJSON} from 'kepler.gl/processors';
import {addDataToMap, wrapTo} from 'kepler.gl/actions';
import meteorite from './data/meteorite';

const MAPBOX_TOKEN = process.env.MapboxAccessToken;

const hideAndShowSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');

class App extends Component {
  componentDidMount() {
    this.props.dispatch(
      wrapTo(
        'map1',
        addDataToMap(processKeplerglJSON(meteorite))
      )
    );
  }

  _toggleSidePanelVisibility = () => {
    this.props.dispatch(wrapTo('map1', hideAndShowSidePanel()));
  };

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <button onClick={this._toggleSidePanelVisibility}> Hide / Show Side Panel</button>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map1" width={width} height={height} />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
