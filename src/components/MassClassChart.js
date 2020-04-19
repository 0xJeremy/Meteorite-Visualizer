import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleOrdinal, scaleLinear, scaleBand} from 'd3-scale';
import { schemeBlues, schemeSpectral } from 'd3-scale-chromatic';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

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
}));

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


  const margin = { top: vh(5), right: vw(1), bottom: 0, left: vw(2) },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;


  var all_classes = Array.from(data.map(function(d)
      { 
        var new_class = d.class
                .replace(/[0-9]/g, '')
                .replace(/(.*)\s/g,'')
                .replace(/(^[.*+\-?^${}()|[\]\\/])/g,'')
                .replace(/([.*+\-?^${}()|[\]\\/]$)/g,'');
        d.class = new_class;
        // d.mass = d.mass/1000
        return new_class;
      }).values());

  // data.map(d => console.log(d.class));

  var counts = {};

  var cls_masses = {};



  // Less than 10kg
  var range1 = .5
  //10-20 kg
  var range2 = 1
  //20-30 kg
  var range3 = 2
  //30-40 kg
  var range4 = 4
  //40-50 kg
  var range5 = 10
  //50-60kg
  var range6 = 20
  //60-70kg
  var range7 = 30
  //70-80kg
  // var range8 = 40
  //80-90kg
  // var range9 = 50
  //90-100kg
  // var range10 = 100
  //100+


  var range_keys = ["<r1","r1-r2","r2-r3","r3-r4","r4-r5","r5-r6","r6-r7","r7-r8",/*"r8-r9","r9-r10","r10+"*/];

  var range_strings = [`<${range1}`,
                        `${range1}-${range2}`,
                        `${range2}-${range3}`,
                        `${range3}-${range4}`,
                        `${range4}-${range5}`,
                        `${range5}-${range6}`,
                        `${range6}-${range7}`,
                        `${range7}+`]


  for (var i = 0; i < all_classes.length; i++) {
    var cls = all_classes[i];
    var subset = data.filter(d => d.class === cls);
    var subset_masses = subset.map(d=>d.mass).reduce((acc,curr)=>{acc.push(curr); return acc}, []);

    var total_masses = subset_masses.length;

    cls_masses[cls] = { "<r1": subset_masses.filter(m=>{return m/1000 < range1}).length/total_masses, 
                       "r1-r2": subset_masses.filter(m=>{return m/1000 >= range1 && m/1000 < range2}).length/total_masses,
                       "r2-r3": subset_masses.filter(m=>{return m/1000 >= range2 && m/1000 < range3}).length/total_masses,
                       "r3-r4": subset_masses.filter(m=>{return m/1000 >= range3 && m/1000 < range4}).length/total_masses,
                       "r4-r5": subset_masses.filter(m=>{return m/1000 >= range4 && m/1000 < range5}).length/total_masses,
                       "r5-r6": subset_masses.filter(m=>{return m/1000 >= range5 && m/1000 < range6}).length/total_masses,
                       "r6-r7": subset_masses.filter(m=>{return m/1000 >= range6 && m/1000 < range7}).length/total_masses,
                       "r7-r8": subset_masses.filter(m=>{return m/1000 >= range7 /*&& m/1000 < range8*/}).length/total_masses,
                       // "r8-r9": subset_masses.filter(m=>{return m/1000 >= range8 && m/1000 < range9}).length/total_masses,
                       // "r9-r10": subset_masses.filter(m=>{return m/1000 >= range9 && m/1000 < range10}).length/total_masses,
                       // "r10+": subset_masses.filter(m=>{return m/1000 >= range10}).length/total_masses
                     }

    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

  var keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})

  var display_top_X_classes = 3;

  var top_X = keysSorted.slice(0,display_top_X_classes);

  var to_display = top_X.reduce((acc,curr)=>{
                      var entries = Object.entries(cls_masses[curr]);
                      acc[curr] = Object.fromEntries(entries.map((curr, index)=>{entries[index][1] = (index===0) ? curr[1] : entries[index-1][1]+curr[1]; return [curr[0], entries[index][1]]; })); 
                      return acc;
                    }, {});

  console.log(to_display);

  var x = scaleLinear()
    .domain([0,1])
    .range([0, width])

  var y = scaleBand()
    .domain(keysSorted.slice(0,display_top_X_classes))
    .range([0, height])
    .padding(0.08)

  var color = scaleOrdinal()
    .domain(range_keys)
    .range(schemeBlues[range_keys.length])



  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg} id="MassClassChart">
        <g transform={`translate(${margin.left}, ${margin.top*1.5})`}>
          <text y={-vh(4)} style={{fill: '#4fbbd6', fontSize:'15px'}}>Kilograms</text>
          {
            range_keys.map((key, i)=>{
              return(
                <g>
                  <rect x = {3+26*i} y = {-vh(3)} width={25} height={10} fill={color(key)}/>
                  <text y={-vh(0)} x={3+26*i} style={{fill: '#4fbbd6', fontSize:'10px'}}>{range_strings[i]}</text>
                </g>
              )
            })
          }
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x).ticks(width / 50, "%"))} />
          <g ref={node => select(node).call(axisLeft(y).tickSizeOuter(0))} />
          {
            range_keys.map((key,index)=>{
              if(index === 0){
                return (
                  <g style={{fill:color(key)}}>
                    {
                      Object.keys(to_display).map(d=>{
                        var end = to_display[d][key];
                        return (<rect 
                          x={x(0)}
                          y={y(d)} 
                          width={x(end)-x(0)} 
                          height={y.bandwidth()} 
                          />);
                      })
                    }
                  </g>
                )
              }
              var prev_key = range_keys[index-1];
              return (
                <g style={{fill:color(key)}}>
                  {
                    Object.keys(to_display).map(d=>{
                      var end = to_display[d][key];
                      var start = to_display[d][prev_key];
                      return (<rect 
                        x={x(start)}
                        y={y(d)} 
                        width={x(end)-x(start)} 
                        height={y.bandwidth()} 
                        />);
                    })
                  }
                </g>
              )
              
            })
          }
        </g>
      </svg>
    </Paper>
  )
};
