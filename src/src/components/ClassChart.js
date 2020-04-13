import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
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


  var all_classes = Array.from(data.map(function(d)
      {return d.class
                .replace(/[0-9]/g, '')
                .replace(/(.*)\s/g,'')
                .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
                .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
      }).values())

  var unique_classes = all_classes.filter(onlyUnique)

  var counts = {};

  for (var i = 0; i < all_classes.length; i++) {
    var cls = all_classes[i];
    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

  const x = scaleBand()
            .range([0, width])
            .domain(Object.keys(counts));



  var y_max = max(Object.values(counts))

  const y = scaleLinear()
            .domain([0, y_max])
            .range([height, 0]);

  console.log(Object.keys(counts));
  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg} id="ClassChart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x))}  />
          <g>
            <g ref={node => select(node).call(axisLeft(y).ticks(10))}/> 
            <text className={classes.text} transform="rotate(-90)" y={-vw(2)-2} x={-svgHeight/4} style={{fill: '#4fbbd6'}}>

              # Meteorites
            </text>
          </g>
           {
            // counts.map(d => {
            //   return (
            //     <rect
            //       // key={d.mass/1000}
            //       style={{fill: '#D55D0E'}}
            //       className="bar"
            //       x={}
            //       y={}
            //       width={}
            //       height={}
            //     />
            //   )
            }

          <text className={classes.text} y={vh(28)+2} x={svgWidth/2+vw(1)} style={{fill: '#4fbbd6'}}>
              Classes/Types
          </text>
        </g>
      </svg>
    </Paper>
  )
};
