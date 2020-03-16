import React from 'react';
import styled from 'styled-components';


import { makeStyles } from '@material-ui/core/styles';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  container: {
    margin: '0',
    padding: '0',
    
  },
  table: {
    margin: '1rem 0 2rem 0',
  },
  tableRow: {
    borderBottom: '2px solid lightgray',
  },
  text: {
    margin:'1rem .5rem 0 0',
  },
});


const ModalContent = ({seatId, price, submitCardInfo}) => {

  const row = seatId? seatId[0] : '' ;
  const num = seatId? seatId[2] : '' ;
  console.log('modalseatId ', seatId);

  const [creditcard, setCreditCard] = React.useState('');
  const [expiry, setExpiry] = React.useState('');

  const submitPurchase = (ev) => {
    ev.preventDefault();
    console.log('purchase attempt');
    submitCardInfo();

    
  };


  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Title>Purchase Ticket</Title>
      <DialogContent>{`You're purchasing 1 ticket for the price of $${price}`}</DialogContent>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell align="center">Row</TableCell>
              <TableCell align="center">Seat</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.tableRow}>
              <TableCell align="center">{row}</TableCell>
              <TableCell align="center">{num}</TableCell>
              <TableCell align="center">{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
    <FormControl>
      <StyledForm
      onSubmit={(ev)=>submitPurchase(ev)}
      >
        <h3>Enter payment details</h3>
        <TextField 
        className={classes.text} 
        required id="card-number" 
        name='card-number' 
        label="Credit card" 
        variant="outlined"
        onChange={(ev)=> setCreditCard(ev.target.value)}
        />
        <TextField 
        className={classes.text} 
        required id="card-exp" 
        name='card-exp' 
        label="Expiration" 
        variant="outlined"
        onChange={(ev)=> setExpiry(ev.target.value)}
        />
        <Button 
        type='submit' 
        variant="contained" 
        color="primary"

        >
            Purchase
        </Button>
      </StyledForm>
    </FormControl>
  </Container>
  )
}


const Title = styled.h1`
  margin: 1rem;
`;

const StyledForm = styled.form`
  margin: 0;
  width: 600px;
  background-color: lightgray;
  padding: 2rem 1rem;

  Button {
    height: 3.5rem;
    margin-top: 1rem;
  }
`;



export default ModalContent;