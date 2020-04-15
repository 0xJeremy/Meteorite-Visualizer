import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleBand, scaleLinear, scaleOrdinal, scaleCategory20} from 'd3-scale';
import { interpolateInferno, interpolateBlues, interpolatePurples, interpolatePuBuGn, interpolateCool } from 'd3-scale-chromatic'
import { select } from 'd3-selection';
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

  var radius = Math.min(width, height) / 2

  var all_classes = Array.from(data.map(function(d)
      {return d.class
                .replace(/[0-9]/g, '')
                .replace(/(.*)\s/g,'')
                .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
                .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
      }).values())

  var counts = {};

  for (var i = 0; i < all_classes.length; i++) {
    var cls = all_classes[i];
    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

 const colorRangeInfo = {
        colorStart: 0,
        colorEnd: 1,
        useEndAsStart: false,
      };

  const colorScale = interpolateCool;

  var scheme = interpolateColors(Object.keys(counts).length,colorScale,colorRangeInfo)


  var keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})

  var color = scaleOrdinal()
  .domain(keysSorted)
  .range(scheme)

 
  var make_pie = pie()
    .value(function(d) {return d.value; });
  var data_ready = make_pie(entries(counts));

  var x = arc().innerRadius(0).outerRadius(radius).startAngle(0).endAngle(Math.PI * 2);

  // TODO: Add legend or tooltip
  // TODO: Center Pie Chart
  // TODO: Fix labels

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg} id="ClassChart">
        <g transform={`translate(${width/2+radius/2}, ${height/2+radius/2-2*margin.top})`} key={"pie_chart"}>
           {
            data_ready.map(d => {
              x = arc().innerRadius(0).outerRadius(radius).startAngle(d.startAngle).endAngle(d.endAngle);
              
              if((d.startAngle-d.endAngle) >= Math.PI/8){
                console.log("Test")
                return (
                  <g className="arc" key={"arc_"+d.data.key}>
                    <path d={x()} fill={color(d.data.key)} key={d.data.key}/>
                      <text transform={`translate(${x.centroid(d)})`} dy="0em" style={{fontSize:"12px"}}>
                        {d.data.key}
                      </text>
                    />
                  </g>
                )
              }

              return (
                  <g className="arc" key={"arc_"+d.data.key}>
                    <path d={x()} fill={color(d.data.key)} />
                  </g>
                )
            })
          }
        </g>
      </svg>
    </Paper>
  )
};
