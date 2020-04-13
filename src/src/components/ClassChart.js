import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { histogram } from 'd3-array';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: '8px',
    marginRight: '8px',
    marginTop: '16px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '31vh',
    padding: '0 0 0 0'
  },
  svg: {
    minHeight: '30vh',
    minWidth: '100%',
  },
  text: {
    textAnchor: "end",
    color: '#4fbbd6',
    fontSize: '25px'
  },
}));


export default function ClassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const hoverItem = props.hoverItem;

  function vw(view_width) {
    return view_width * (window.innerWidth / 100)
  }

  function vh(view_height) {
    return view_height * (window.innerHeight / 100)
  }

  const svgWidth = vw(23),
        svgHeight = vh(24);

  const margin = { top: vh(1), right: 0, bottom: 0, left: vw(5) },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  var unique_classes = Array.from(data.map(function(d)
      {return d.class
                .replace(/[0-9]/g, '')
                .replace(/(.*)\s/g,'')
                .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
                .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
      }).values()).filter(onlyUnique)

  console.log(unique_classes);


  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} />
          <g>
            <g /> 
            <text className={classes.text} transform="rotate(-90)" y={-vw(2)-2} x={-svgHeight/4} style={{fill: '#4fbbd6'}}>

              # Meteorites
            </text>
          </g>

          <text className={classes.text} y={vh(28)+2} x={svgWidth/2+vw(1)} style={{fill: '#4fbbd6'}}>
              Class/Type

          </text>
        </g>
      </svg>
    </Paper>
  )
};
