import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  dialog: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  green: {
    color: '#48c74e'
  },
  outline_green: {
    borderColor: '#48c74e',
    height: '100%'
  },
  box: {
    backgroundColor: '#242730',
    color: '#4fbbd6',
    borderRadius: '0px'
  },
  paper: {
    borderRadius: '0px'
  },
  link: {
    color: 'white'
  }
}));

export default function InfoBox(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog className={classes.dialog} classes={{paper: classes.paper}} open={open} onClose={handleClose}>
        <DialogTitle className={classes.box} >Meteorite Data Visualizer</DialogTitle>
        <DialogContent className={classes.box} >
          <DialogContentText className={classes.box}>
            Welcome to the meteorite data visulizer. This page shows all the meteorite data ever collected by NASA.
            You can view the original dataset <a className={classes.link} href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh" target="_blank">here</a>.
            <br />Please enjoy.
            <br /><br /><br /><br />
            Made with ❤️ by Jeremy Kanovsky & Ben London
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.box} >
          <Button className={classes.green} classes={{outlined: classes.outline_green}} variant="outlined" onClick={handleClose} >
            Done!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
