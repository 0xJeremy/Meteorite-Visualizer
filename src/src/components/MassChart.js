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
    padding: theme.spacing(2),
    marginBottom: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '30vh'
  },
  svg: {
    minHeight: '30vh',
    minWidth: '100%'
  },
}));

export default function MassChart(props) {
  const classes = useStyles();
  const data = props.data;

  const svgWidth = 450,
        svgHeight = 300;

  const margin = { top: 20, right: 100, bottom: 50, left: 30 },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;


  var x = scaleLinear()
      .domain([0, max(data, function(d) { return +d.mass/1000 })])
      .range([0, width]);


  // Ended up being way too many, theres a ton of overlap, but leaving in for adjustment
  // var num_unique_masses = Array.from(data.map(function(d){return d.roadname;}).keys()).count;

  var hist = histogram()
      .value(function(d) { return d.mass/1000; })
      .domain(x.domain())
      .thresholds(x.ticks(10)); 

  var bins = hist(data);

  var y_max = max(bins, function(d) { return d.length; })

  var y = scaleLinear()
      .range([height, 0]);
  y.domain([0, y_max]);


  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x))} />
          <g>
            <g ref={node => select(node).call(axisLeft(y).ticks((y_max % 10)))}/> 
{/*            <text transform="rotate(-90)" y="-10" dy="0.5em" textAnchor="end">
              Frequency
            </text>*/}
          </g>
          {bins.map(d => (
            <rect
              key={d.mass/1000}
              className="bar"
              x={x(d.x0)+1}
              y={y(d.length)}
              width={x(d.x1) - x(d.x0) - 2}
              height={height - y(d.length)}
            />
          ))}
        </g>
      </svg>
    </Paper>
  )
};
