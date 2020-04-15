import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { histogram } from 'd3-array';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginBottom: '8px',
    marginRight: '8px',
    marginTop: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '30vh',
    padding: '0 0 0 0'
  },
  svg: {
    minHeight: '31vh',
    minWidth: '100%',
  },
  text: {
    textAnchor: "end",
    color: '#4fbbd6',
    fontSize: '25px'
  },
}));


export default function MassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const setSelectedData = props.setSelectedData;

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

  const x = scaleLinear()
          .domain([0, max(data, function(d) { return +d.mass/1000 })])
          .range([0, width]);


  // Ended up being way too many, theres a ton of overlap, but leaving in for adjustment
  // const num_unique_masses = Array.from(data.map(function(d){return d.roadname;}).keys()).count;

  const hist = histogram()
            .value(function(d) { return d.mass/1000; })
            .domain(x.domain())
            .thresholds(x.ticks(10)); 

  const bins = hist(data);

  const y_max = max(bins, function(d) { return d.length; })

  const y = scaleLinear()
      .range([height, 0])
      .domain([0, y_max]);

  // const bars = document.getElementsByClassName("bar");
  // for (var i = 0; i < bars.length; i++) {
  //     const index = i;
  //     bars[i].addEventListener('mouseover', () => {
  //       if(selectedData !== bins[index]) {
  //         setSelectedData(bins[index]);
  //       }
  //     });
  //     bars[i].addEventListener('mouseout', () => {setSelectedData(null)});
  // }

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x))} />
          <g>
            <g ref={node => select(node).call(axisLeft(y).ticks((y_max % 10)))}/> 
            <text className={classes.text} transform="rotate(-90)" y={-vw(2)-2} x={-svgHeight/4} style={{fill: '#4fbbd6'}}>
              # Meteorites
            </text>
          </g>
          {bins.map((d,i)=> {
            if(selectedData !== null && d.includes(selectedData[0])) {
              return (
                <rect
                  // key={d.mass/1000}
                  style={{fill: '#D55D0E'}}
                  className="bar"
                  x={x(d.x0)+1}
                  y={y(d.length)}
                  width={x(d.x1) - x(d.x0) - 2}
                  height={height - y(d.length)}
                  key={"bin_"+i}
                />
              )
            }
            return (
                <rect
                  // key={d.mass/1000}
                  style={{fill: '#4fbbd6'}}
                  className="bar"
                  x={x(d.x0)+1}
                  y={y(d.length)}
                  width={x(d.x1) - x(d.x0) - 2}
                  height={height - y(d.length)}
                  key={"bin_"+i}
                />
              )
          })}

          <text className={classes.text} y={vh(28)+2} x={svgWidth/2+vw(1)} style={{fill: '#4fbbd6'}}>
              Mass (kg)
          </text>
        </g>
      </svg>
    </Paper>
  )
};
