import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    maxHeight: '28vh',
    // backgroundColor: '#242730',
  },
  table: {
    minWidth: 650,
    fontWeight: 'bold',
  },
});

export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data;

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Class&nbsp;</TableCell>
            <TableCell align="right">Year&nbsp;</TableCell>
            <TableCell align="right">Mass&nbsp;(g)</TableCell>
            <TableCell align="right">Coordinates&nbsp;(lat/lng)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.name}>
              <TableCell component="th" scope="row">
                {d.name}
              </TableCell>
              <TableCell align="right">{d.class}</TableCell>
              <TableCell align="right">{d.year}</TableCell>
              <TableCell align="right">{d.mass}</TableCell>
              <TableCell align="right">{d.coordinates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
