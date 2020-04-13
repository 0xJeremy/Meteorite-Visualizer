import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  paper: {
    marginBottom: '8px',
    marginLeft: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '30px',
    backgroundColor: '#242730',
    minHeight: '27.1vh'
  },
  text: {
    paddingBottom: '16px'
  },
  green: {
    color: '#48c74e'
  },
  red: {
    color: '#e03131',
    marginRight: '8px'
  },
  outline_blue: {
    borderColor: '#4fbbd6',
    height: '100%'
  },
  outline_green: {
    borderColor: '#48c74e',
    height: '100%'
  },
  outline_red: {
    borderColor: '#e03131',
    height: '100%'
  },
  timeline: {
    marginTop: '24px',
    fontSize: '20px',
  }
});

const Timeline = withStyles({
  root: {
    color: '#4fbbd6',
    maxWidth: '90%'
  }
})(Slider)

function valuetext(value) {
  return `${value}`;
}

export default function TogglePanel(props) {
  const classes = useStyles();
  const [snackMore, setSnackMore] = React.useState(false);
  const [snackLess, setSnackLess] = React.useState(false);
  const timeline = props.timeline;
  const setTimeline = props.setTimeline;
  const more = props.more;
  const less = props.less;

  const clickLess = () => {
    setSnackLess(true);
    setSnackMore(false);
    less();
  }

  const closeLess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackLess(false);
  }

  const clickMore = () => {
    setSnackMore(true);
    setSnackLess(false);
    more();
  }

  const closeMore = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackMore(false);
  }

  const timelineChange = (event, newValue) => {
    setTimeline(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.text} >Data Options</div>

      <Button className={classes.red} classes={{outlined: classes.outline_red}} variant="outlined" onClick={clickLess} >Load Less Data</Button>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={clickMore} >Load More Data</Button>

      <Typography className={classes.timeline} id="range-slider" gutterBottom>
        Data Range ({timeline[0]} - {timeline[1]})
      </Typography>
      <Timeline
        value={timeline}
        onChange={timelineChange}
        min={1950}
        max={2020}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />


      <Snackbar open={snackMore} autoHideDuration={6000} onClose={closeMore}>
        <Alert onClose={closeMore} severity="success">
          Loading more data!
        </Alert>
      </Snackbar>
      <Snackbar open={snackLess} autoHideDuration={6000} onClose={closeLess}>
        <Alert onClose={closeLess} severity="error">
          Loading less data!
        </Alert>
      </Snackbar>

    </Paper>
  );
}
