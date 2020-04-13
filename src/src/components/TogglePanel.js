import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  paper: {
    marginBottom: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '30px',
    backgroundColor: '#242730'
  },
  text: {
    paddingBottom: '8px'
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
});

export default function TogglePanel(props) {
  const classes = useStyles();
  const more = props.more;
  const less = props.less;

  return (
    <Paper className={classes.paper} style={{minHeight: '30vh'}}>
      <div className={classes.text} >viz options</div>

      <Button className={classes.red} classes={{outlined: classes.outline_red}} variant="outlined" onClick={less} >Load Less Data</Button>
      <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={more} >Load More Data</Button>

    </Paper>
  );
}
