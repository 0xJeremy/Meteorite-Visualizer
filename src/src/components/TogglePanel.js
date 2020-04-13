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
    marginLeft: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '30px',
    backgroundColor: '#242730',
    minHeight: '33vh'
  },
  text: {
    paddingBottom: '16px',
  },
  green: {
    color: '#48c74e',
    marginRight: '16px'
  },
  outline_green: {
    borderColor: '#48c74e',
    height: '100%'
  },
  timeline: {
    marginTop: '24px',
    fontSize: '20px',
  },
  load: {
    fontSize: '20px',
  },
  alert: {
    backgroundColor: '#4fbbd6',
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
  const [smallSnack, setSnackSmall] = React.useState(false);
  const [mediumSnack, setSnackMedium] = React.useState(false);
  const [largeSnack, setSnackLarge] = React.useState(false);
  const timeline = props.timeline;
  const setTimeline = props.setTimeline;
  const setData = props.setData;

  const clickSmall = () => {
    setSnackSmall(true);
    setSnackMedium(false);
    setSnackLarge(false);
    setData('small');
  }
  const closeSmall = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackSmall(false);
  }

  const clickMedium = () => {
    setSnackSmall(false);
    setSnackMedium(true);
    setSnackLarge(false);
    setData('medium');
  }
  const closeMedium = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackMedium(false);
  }

  const clickLarge = () => {
    setSnackSmall(false);
    setSnackMedium(false);
    setSnackLarge(true);
    setData('large');
  }
  const closeLarge = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setSnackLarge(false);
  }


  const timelineChange = (event, newValue) => {
    setTimeline(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.text} >Data Options</div>

      <Typography className={classes.load} gutterBottom>
        Load Data Set
      </Typography>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={clickSmall} >Small</Button>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={clickMedium} >Medium</Button>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={clickLarge} >Large</Button>

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


      <Snackbar open={smallSnack} autoHideDuration={6000000} onClose={closeSmall}>
        <Alert onClose={closeSmall} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading small data set!
        </Alert>
      </Snackbar>
      <Snackbar open={mediumSnack} autoHideDuration={6000} onClose={closeMedium}>
        <Alert onClose={closeMedium} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading medium data set!
        </Alert>
      </Snackbar>
      <Snackbar open={largeSnack} autoHideDuration={6000} onClose={closeLarge}>
        <Alert onClose={closeLarge} severity="success" color="info" classes={{filledInfo: classes.alert}}>
          Loading large data set!
        </Alert>
      </Snackbar>


    </Paper>
  );
}
