import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

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
  },
}));

export default function MassChart(props) {
  const classes = useStyles();
  const data = props.data;

  const svgWidth = 300,
        svgHeight = 300;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

  const x = scaleBand()
            .rangeRound([0, width])
            .padding(0.1),
        y = scaleLinear().rangeRound([height, 0]);

  x.domain(data.map(d => d.mass));
  y.domain([0, max(data, d => d.mass)]);

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x))} />
          <g>
            <g ref={node => select(node).call(axisLeft(y).ticks(10, '%'))} />
{/*            <text transform="rotate(-90)" y="-10" dy="0.5em" textAnchor="end">
              Frequency
            </text>*/}
          </g>
          {data.map(d => (
            <rect
              key={d.mass}
              className="bar"
              x={x(d.mass)}
              y={y(d.mass)}
              width={x.bandwidth()}
              height={height - y(d.mass)}
            />
          ))}
        </g>
      </svg>
    </Paper>
  )
};
