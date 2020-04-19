import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleOrdinal} from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic'
import { pie, arc } from 'd3-shape';
import { entries } from 'd3-collection';
import { interpolateColors } from '../colorSchemeGenerator.js'

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
    minHeight: '32vh',
    padding: '0 0 0 0'
  },
  svg: {
    minHeight: '30vh',
    minWidth: '100%',
  },
  text: {
    textAnchor: 'middle',
    fontSize: '18px'
  },
  title: {
    fontSize: '25px',
    textAnchor: 'middle'
  },
  arc: {
    "&:hover": {
      fill: '#D55D0E',
    }
  }
}));

function Arc(props) {
  const classes = useStyles();
  const d = props.d;
  const color = props.color;
  const x = props.x;
  const setHover = props.setHover;
  const [fill, setFill] = React.useState(color(d.data.key));
  const selectedData = props.selectedData;

  function process(c) {
    return c
            .replace(/[0-9]/g, '')
            .replace(/(.*)\s/g,'')
            .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
            .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
  }

  function enter() {
    setHover(d);
    setFill('#D55D0E');
  }

  function leave() {
    setHover(null);
    setFill(color(d.data.key));
  }

  if(selectedData !== null && selectedData[0] !== undefined && process(selectedData[0].class) === d.data.key) {
    return (
      <g className={classes.arc} key={"arc_"+d.data.key}>
          <path d={x()} fill={'#D55D0E'} onMouseEnter={enter} onMouseLeave={leave} />
      </g>
    )
  }
  return (
    <g className={classes.arc} key={"arc_"+d.data.key}>
        <path d={x()} fill={fill} onMouseEnter={enter} onMouseLeave={leave} />
    </g>
  )
}


export default function ClassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const [hover, setHover] = React.useState(null);

  function vw(view_width) {
    return view_width * (window.innerWidth / 100)
  }

  function vh(view_height) {
    return view_height * (window.innerHeight / 100)
  }

  const svgWidth = vw(23),
        svgHeight = vh(24);


  const margin = { top: vh(2.5), right: 0, bottom: 0, left: 0 },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

  var radius = Math.min(width, height) * 3/5

  var all_classes = Array.from(data.map(function(d)
      { 
        var new_class = d.class
                .replace(/[0-9]/g, '')
                .replace(/(.*)\s/g,'')
                .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
                .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
        d.class = new_class;
        return new_class;
      }).values());

  // data.map(d => console.log(d.class));

  var counts = {};

  for (var i = 0; i < all_classes.length; i++) {
    var cls = all_classes[i];
    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

 const colorRangeInfo = {
        colorStart: .05,
        colorEnd: 0.9,
        useEndAsStart: true,
      };

  const colorScale = interpolateBlues;

  var scheme = interpolateColors(Object.keys(counts).length,colorScale,colorRangeInfo)


  var keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})

  var color = scaleOrdinal()
  .domain(keysSorted)
  .range(scheme)

 
  var make_pie = pie()
    .value(function(d) {return d.value; });
  var data_ready = make_pie(entries(counts));

  var x = arc().innerRadius(0).outerRadius(radius).startAngle(0).endAngle(Math.PI * 2);

  const pad = Math.PI/180

  function ToolTip() {
    if(hover !== null) {
      return (
        <text className={classes.text} y={vh(16)} x={vw(12)} style={{fill: '#D55D0E'}}>
          {"Class " + hover.data.key + " (" + hover.data.value + ")"}
        </text>
      )
    }
    return <div />
  }

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg} id="ClassChart">
        <text className={classes.title} y={vh(2.5)} x={vw(12)} style={{fill: '#4fbbd6'}}>
          Meteorite Class
        </text>
        <g transform={`translate(${width/2+radius/16}, ${height/2+radius/4+margin.top})`} key={"pie_chart"}>
           {
            data_ready.map(d => {
              x = arc().innerRadius(radius/1.5).outerRadius(radius).startAngle(d.startAngle+pad).endAngle(d.endAngle-pad);
              
              return (
                  <Arc x={x} d={d} color={color} setHover={setHover} selectedData={selectedData}/>
                )
            })
          }
        </g>
        <ToolTip />
      </svg>
    </Paper>
  )
};
