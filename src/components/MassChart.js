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
  const [fill, setFill] = React.useState('#0a4a90');

  function enter() {
    setHover(d);
    setFill('#D55D0E');

  }

  function leave() {
    setHover(null);
    setFill('#0a4a90')
  }

  if(selectedData !== null && selectedData !== undefined && d.includes(selectedData[0])) {
    return (<rect
      // key={d.mass/1000}
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
    // key={d.mass/1000}
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

  var range1 = .5
  var range2 = 1
  var range3 = 2
  var range4 = 4
  var range5 = 10
  var range6 = 20
  var range7 = 30



  var range_keys = ["<r1","r1-r2","r2-r3","r3-r4","r4-r5","r5-r6","r6-r7","r7+"];

  var range_strings = [`<${range1}`,
                        `${range1}-${range2}`,
                        `${range2}-${range3}`,
                        `${range3}-${range4}`,
                        `${range4}-${range5}`,
                        `${range5}-${range6}`,
                        `${range6}-${range7}`,
                        `${range7}+`]


  var masses = data.map((d)=>{return d.mass});
  
  var grouped_masses = { "<r1": masses.filter(m=>{return m/1000 < range1}).length, 
                         "r1-r2": masses.filter(m=>{return m/1000 >= range1 && m/1000 < range2}).length,
                         "r2-r3": masses.filter(m=>{return m/1000 >= range2 && m/1000 < range3}).length,
                         "r3-r4": masses.filter(m=>{return m/1000 >= range3 && m/1000 < range4}).length,
                         "r4-r5": masses.filter(m=>{return m/1000 >= range4 && m/1000 < range5}).length,
                         "r5-r6": masses.filter(m=>{return m/1000 >= range5 && m/1000 < range6}).length,
                         "r6-r7": masses.filter(m=>{return m/1000 >= range6 && m/1000 < range7}).length,
                         "r7+": masses.filter(m=>{return m/1000 >= range7}).length}

  var x = scaleBand()
    .domain(range_strings)
    .range([0, width])


  const y_max = max(Object.values(grouped_masses))

  var y = scaleLinear()
      .range([height, 0])
      .domain([0, y_max]);


  var color = scaleOrdinal()
    .domain(range_keys)
    .range(schemeBlues[range_keys.length])

 function ToolTip() {
    if(hover !== null) {
      return (
        <text className={classes.text} y={vh(8)} x={vw(18)} style={{fill: '#D55D0E'}}>
        </text>
      )
      
    }
    return <div />
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
         {range_strings.map((r_str,i)=> {
           return (<rect
             x={x(r_str)+1}
             y={y(grouped_masses[range_keys[i]])}
             width={x.bandwidth()-2}
             height={height-y(grouped_masses[range_keys[i]])}
             key={"bin_"+i}
             fill = {color(r_str)}
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



  // function ToolTip() {
  //   if(hover !== null) {
  //     return (
  //       <text className={classes.text} y={vh(8)} x={vw(18)} style={{fill: '#D55D0E'}}>
  //         {"Mass " + ((parseInt(hover.x1) === max_x) ? (hover.x0 + "+") : (hover.x0 + "-" + hover.x1)) + " (kg) (" +  hover.length + ")"}
  //       </text>
  //     )
      
  //   }
  //   return <div />
  // }

};
