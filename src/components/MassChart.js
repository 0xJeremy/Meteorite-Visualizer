import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { max, mean } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { histogram } from 'd3-array';
import { schemeBlues } from 'd3-scale-chromatic';

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
    minHeight: '28vh',
    padding: '0 0 0 0'
  },
  svg: {
    minHeight: '29vh',
    minWidth: '100%',
  },
  text: {
    textAnchor: "end",
    color: '#4fbbd6',
    fontSize: '20px'
  },
  tooltip: {
    textAnchor: "end",
    color: '#4fbbd6',
    fontSize: '20px',
    border: "5px solid red"
  },
}));

function Bar(props) {
  const d = props.d;
  const x = props.x;
  const y = props.y;
  const width = props.width;
  const height = props.height;
  const setHover = props.setHover;
  const selectedData = props.selectedData;
  const defaultFill = props.defaultFill;
  const [fill, setFill] = React.useState(defaultFill);

  function enter() {
    setHover(d);
    setFill('#D55D0E');

  }

  function leave() {
    setHover(null);
    setFill(defaultFill);
  }

  if(selectedData !== null && d.data.includes(selectedData[0])) {
    return (<rect
      style={{'fill': '#D55D0E'}}
      className="bar"
      x={x}
      y={y}
      width={width}
      height={height}
      onMouseEnter={enter}
      onMouseLeave={leave}
    />)
  }

  return (<rect
    style={{'fill': fill}}
    className="bar"
    x={x}
    y={y}
    width={width}
    height={height}
    onMouseEnter={enter}
    onMouseLeave={leave}
  />)
}


export default function MassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const setSelectedData = props.setSelectedData;
  const [hover, setHover] = React.useState(null);

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

  var breakpoints = [0.5, 1, 2, 4, 10, 20, 30];

  var mass_data = [];
  for(var i = 0; i < breakpoints.length; i++) {
    var range;
    if(i === 0) { range = [0, breakpoints[i]]; }
    else if(i === breakpoints.length-1) { range = [breakpoints[i], 9999999999999999]; }
    else { range = [breakpoints[i-1], breakpoints[i]]; }
    var tmp = data.filter((d)=>{return d.mass/1000 >= range[0] && d.mass/1000 < range[1]});
    mass_data.push({
      'range': range,
      'data': tmp,
      'actual': breakpoints[i]
    });
  }

  var x = scaleBand()
    .domain(breakpoints)
    .range([0, width])

  const y_max = max(mass_data.map((d)=>{return d.data.length}))

  var y = scaleLinear()
      .range([height, 0])
      .domain([0, y_max]);

  var color = scaleOrdinal()
    .domain(breakpoints)
    .range(schemeBlues[breakpoints.length])

 function ToolTip() {
    var tmp;
    if(hover !== null) {
      tmp = hover;
    } else if(selectedData !== null && selectedData[0] !== undefined) {
      tmp = mass_data.filter((d)=>d.data.includes(selectedData[0]))[0];
    } else {
      return <div />
    }
    var min = tmp.range[0];
    var max = tmp.range[1];
    if(min < breakpoints[0]) { var disp = '<' + max; }
    else if(max > breakpoints[breakpoints.length - 1]) { var disp = '>' + min; }
    else { var disp = min.toString() + '-' + max; }
    return (
      <text className={classes.text} y={vh(8)} x={vw(18)} style={{fill: '#D55D0E'}}>
      {disp} kg ({tmp.data.length})
      </text>
    )
  }

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
         <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x))} />
         <g>
           <g ref={node => select(node).call(axisLeft(y).ticks(10))}/> 
           <text className={classes.text} transform="rotate(-90)" y={-vw(2)-5} x={-svgHeight/4} style={{fill: '#4fbbd6'}}>
             # Meteorites
           </text>
         </g>
         {mass_data.map((d,i)=> {
           return (<Bar
             d={d}
             x={x(d.actual)}
             y={y(d.data.length)}
             selectedData={selectedData}
             setHover={setHover}
             width={x.bandwidth()-2}
             height={height-y(d.data.length)}
             key={"bin_"+i}
             defaultFill={color(d.actual)}
           />)
         })}

         <text className={classes.text} y={vh(27)} x={svgWidth/2+vw(1)} style={{fill: '#4fbbd6'}}>
             Mass (kg)
         </text>
         <ToolTip/>
       </g>
      </svg>
    </Paper>
  )

};
