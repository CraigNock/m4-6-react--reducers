import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';






const ModalContent = ({seatId, price}) => {
  const row = seatId.seatId[0];
  const num = seatId.seatId[2];
  console.log(seatId);
  //seatId is an object of seatId and price????

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Row</TableCell>
            <TableCell align="right">Seat</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key='hi'>
            <TableCell align="right">{row}</TableCell>
            <TableCell align="right">{num}</TableCell>
            <TableCell align="right">{price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  </TableContainer>
  )
}


export default ModalContent;