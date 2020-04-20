import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    maxHeight: '33vh',
    backgroundColor: '#242730',
  },
  table: {
    minWidth: 650,
  },
  cell: {
    color: 'white'
  },
  label: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  highlight: {
    color: '#D55D0E',
  }
});

function TableItem(props) {
  const classes = useStyles();
  const selectedData = props.selectedData;
  const hoverCallback = props.hoverCallback;
  const d = props.d;

  function get_color() {
    if(selectedData !== null && selectedData[0] === d) {
      return '#D55D0E';
    }
    return 'white';
  }

  return (
    <TableRow onMouseEnter={() => {hoverCallback([d])}} onMouseLeave={() => {hoverCallback(null)}}>
      <TableCell style={{color: get_color()}} component="th" scope="row">
        {d.name}
      </TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.year}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.class}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.mass}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.coordinates[0]}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.coordinates[1]}</TableCell>
    </TableRow>
  )
}

export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const hoverCallback = props.hoverCallback;

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.label}>Name</TableCell>
            <TableCell className={classes.label} align="right">Year&nbsp;</TableCell>
            <TableCell className={classes.label} align="right">Class&nbsp;</TableCell>
            <TableCell className={classes.label} align="right">Mass&nbsp;(g)</TableCell>
            <TableCell className={classes.label} align="right">Latitude&nbsp;</TableCell>
            <TableCell className={classes.label} align="right">Longitude&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => 
            <TableItem d={d} selectedData={selectedData} hoverCallback={hoverCallback} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
