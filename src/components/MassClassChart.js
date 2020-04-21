import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { scaleOrdinal, scaleLinear, scaleBand} from 'd3-scale';
import { schemeBlues, schemeSpectral } from 'd3-scale-chromatic';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
    borderColor: '#4fbbd6',
    height: '3vh',
    width: '3.9vw',
    top: '0.8vh'
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
    minHeight: '33vh',
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
  ranges: {
    fill: '#4fbbd6',
    fontSize: '12px',
    display: 'inline-block'
  },
  formControl: {
    color: '#4fbbd6',
    position: 'absolute',
    right: '1vw'
  },
  menu: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  gutters: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  }
}));

const Menu = withStyles({
  // root: {
  //   color: '#4fbbd6',
  //   backgroundColor: '#242730',
  //   borderColor: '#4fbbd6',
  // },
})(MenuItem)

function label_to_mass_range(label) {
  if(label === "<r1") {
    return [0, 0.5]
  } else if(label === "r1-r2") {
    return [0.5, 1]
  } else if(label === "r2-r3") {
    return [1, 2]
  } else if(label === "r3-r4") {
    return [2, 4]
  } else if(label === "r4-r5") {
    return [4, 10]
  } else if(label === "r5-r6") {
    return [10, 20]
  } else if(label === "r6-r7") {
    return [20, 40]
  } else if(label === "r7-r8") {
    return [40, 60]
  }
}

function Bar(props) {
  const classes = useStyles;
  const item = props.item;
  const i = props.i;
  const x = props.x;
  const y = props.y;
  const color = props.color;
  const to_display = props.to_display;
  const range_keys = props.range_keys;
  const [hover, setHover] = React.useState(null);
  const selectedData = props.selectedData;

  function enter() {
    setHover(item)
  }

  function leave() {
    setHover(null)
  }

  function get_color(d) {
    if(selectedData !== null && selectedData !== undefined) {
      if(selectedData[0] !== undefined && selectedData[0].class === d) {
        var masses = label_to_mass_range(item);
        if(selectedData[0].mass/1000 >= masses[0] && selectedData[0].mass/1000 <= masses[1]) {
          return '#D55D0E';
        }
      }
    }
    if(hover === item) {
      return '#D55D0E';
    }
    return color(item);
  }

  return (
    <g>
      {
        Object.keys(to_display).map(d=>{
          var end = to_display[d][item];
          var start = to_display[d][range_keys[i-1]];
          return (<rect 
            style={{fill:get_color(d)}}
            x={x(i === 0 ? 0 : start)}
            y={y(d)} 
            onMouseEnter={enter}
            onMouseLeave={leave}
            width={x(end)-x(i === 0 ? 0 : start)} 
            height={y.bandwidth()} 
            key={d}
          />);
        })
      }
    </g>
  )
}

export default function ClassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const [hover, setHover] = React.useState(null);
  const [showNum, setShowNum] = React.useState(3);

  function vw(view_width) {
    return view_width * (window.innerWidth / 100)
  }

  function vh(view_height) {
    return view_height * (window.innerHeight / 100)
  }

  const svgWidth = vw(23),
        svgHeight = vh(30);


  const margin = { top: vh(7), right: vw(0), bottom: 0, left: vw(4) },
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

  var top_X = keysSorted.slice(0,showNum);

  var to_display = top_X.reduce((acc,curr)=>{
                      var entries = Object.entries(cls_masses[curr]);
                      acc[curr] = Object.fromEntries(entries.map((curr, index)=>{entries[index][1] = (index===0) ? curr[1] : entries[index-1][1]+curr[1]; return [curr[0], entries[index][1]]; })); 
                      return acc;
                    }, {});

  var x = scaleLinear()
    .domain([0,1])
    .range([0, width])

  var y = scaleBand()
    .domain(keysSorted.slice(0,showNum))
    .range([0, height])
    .padding(0.08)

  var color = scaleOrdinal()
    .domain(range_keys)
    .range(schemeBlues[range_keys.length])

  const handleShowNum = (event) => {
    setShowNum(event.target.value);
  };


  return (
    <Paper className={classes.paper}>
    <FormControl className={classes.formControl}>
      <InputLabel classes={{root: classes.root}}># Classes</InputLabel>
      <Select
        value={showNum}
        onChange={handleShowNum}
        className={classes.root}
        style={{backgroundColor: '#444750'}}
      >
        <Menu value={3}>3</Menu>
        <Menu value={6}>6</Menu>
        <Menu value={9}>9</Menu>
        <Menu value={12}>12</Menu>
        <Menu value={15}>15</Menu>
        <Menu value={17}>All</Menu>
      </Select>
    </FormControl>
      <svg className={classes.svg} id="MassClassChart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text x = {-margin.left/1.2} y={-vh(5)} style={{fill: '#4fbbd6', fontSize:'15px'}}>Kilograms</text>
          {
            range_keys.map((key, i)=>{
              return(
                <g style={{marginRight: 'auto',marginLeft: 'auto'}} key={key}>
                  <rect x={-margin.left/1.2+vw(2.3)*i} y={-vh(4)} width={vw(2.1)} height={vh(1)} fill={color(key)}/>
                  <text x={-margin.left/1.2+vw(2.3)*i+vw(.2)} y={-vh(1.5)} className={classes.ranges} >{range_strings[i]}</text>
                </g>
              )
            })
          }
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x).ticks(width / 50, "%"))} />
          {
            range_keys.map((item,i)=>{
              return (<Bar item={item} i={i} x={x} y={y} color={color} to_display={to_display} range_keys={range_keys} selectedData={selectedData} key={i}/>)
            })
          }
          <g ref={node => select(node).call(axisLeft(y).tickSizeOuter(0))} />
        </g>
      </svg>
    </Paper>
  )
};
