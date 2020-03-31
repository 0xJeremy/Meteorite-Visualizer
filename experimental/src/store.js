import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import {enhanceReduxMiddleware} from 'kepler.gl/middleware';
import appReducer from './app-reducer';
import window from 'global/window';

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      readOnly: true,

      mapControls: {
        visibleLayers: {
          show: true
        },
        mapLegend: {
          show: false,
          active: true
        },
        toggle3d: {
          show: false
        },
        splitMap: {
          show: false
        },
        mapDraw: {
          show: false,
          active: false
        }
      }
    }
  })
  .plugin({
    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: !state.uiState.readOnly,
        mapControls: {
          visibleLayers: {
            show: !state.uiState.mapControls.visibleLayers.show
          },
          mapLegend: {
            show: !state.uiState.mapControls.mapLegend.show
          },
          toggle3d: {
            show: !state.uiState.mapControls.toggle3d.show
          },
          splitMap: {
            show: !state.uiState.mapControls.splitMap.show
          },
          mapDraw: {
            show: !state.uiState.mapControls.mapDraw.show
          }
      }
      }
    })
  });


const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  app: appReducer
});

const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares)];

const initialState = {};

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, initialState, composeEnhancers(...enhancers));
