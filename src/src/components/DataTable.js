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
    maxHeight: '28vh',
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
  }
});

export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const hoverItem = props.hoverItem;

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
          {data.map((d) => (
            <TableRow key={d.name}>
              <TableCell className={classes.cell} component="th" scope="row">
                {d.name}
              </TableCell>
              <TableCell className={classes.cell} align="right">{d.year}</TableCell>
              <TableCell className={classes.cell} align="right">{d.class}</TableCell>
              <TableCell className={classes.cell} align="right">{d.mass}</TableCell>
              <TableCell className={classes.cell} align="right">{d.coordinates[0]}</TableCell>
              <TableCell className={classes.cell} align="right">{d.coordinates[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
