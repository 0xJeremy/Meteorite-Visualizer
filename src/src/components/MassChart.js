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

  const x = scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.mass/1000));


  var x1 = scaleLinear()
      .domain([0, max(data, function(d) { return +d.mass/1000 })])
      .range([0, width]);

  const y = scaleLinear()
            .rangeRound([height, 0])
            .domain([0, max(data, d => d.mass/1000)]);

  // data.map(d => console.log(d.mass/1000));

  // var x = scaleLinear()
  //     .domain([0, max(data, function(d) { return +d.mass/1000 })])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
  //     .range([0, width]);

  var num_unique_masses = Array.from(data.map(function(d){return d.roadname;}).keys()).count;

  // set the parameters for the histogram
  var hist = histogram()
      .value(function(d) { return d.mass/1000; })   // I need to give the vector of value
      .domain(x1.domain())  // then the domain of the graphic
      .thresholds(x1.ticks(10)); // then the numbers of bins

  // // And apply this function to data to get the bins
  // console.log(hist);
  var bins = hist(data);
  // console.log(bins);

  var y_max = max(bins, function(d) { return d.length; })

  var y1 = scaleLinear()
      .range([height, 0]);
  y1.domain([0, y_max]);   // d3.hist has to be called before the Y axis obviously


  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x1))} />
          <g>
            <g ref={node => select(node).call(axisLeft(y1).ticks((y_max % 10)))}/> 
{/*            <text transform="rotate(-90)" y="-10" dy="0.5em" textAnchor="end">
              Frequency
            </text>*/}
          </g>
          {bins.map(d => (
            <rect
              key={d.mass/1000}
              className="bar"
              x={x1(d.x0)+1}
              y={y1(d.length)}
              width={x1(d.x1) - x1(d.x0) - 2}
              height={height - y1(d.length)}
            />
          ))}
        </g>
      </svg>
    </Paper>
  )
};
