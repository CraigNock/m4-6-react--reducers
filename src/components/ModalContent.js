import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {SeatContext} from './SeatContext';


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

const ModalContent = ({status, error, selectedSeatIds, price, submitCardInfo, bookingSuccess, bookingError}) => {
  
  const {actions:{markSeatUnavailable}} = React.useContext(SeatContext);
  
  // console.log(selectedSeatIds);

  let sum = () => {
    let num = 0;
    selectedSeatIds.forEach(seat => {
      num = num + seat.price;
    })
    return num;
  };
  let total = sum();

  const SeatsCheckout = () => {
    return(
      <>
      {selectedSeatIds.map(seat => {
        return (
            <TableRow className={classes.tableRow} key={`buyseat${seat.id}`}>
                <TableCell align="center">{seat.id[0]}</TableCell>
                <TableCell align="center">{seat.id[2]}</TableCell>
                <TableCell align="center">${seat.price}</TableCell>
            </TableRow>
        )
      })}
      </>
    )
  };
  

  const [creditCard, setCreditCard] = React.useState('');
  const [expiration, setExpiration] = React.useState('');

  const submitPurchase = (ev) => {
    ev.preventDefault();
    console.log('purchase attempt');
    submitCardInfo();
    fetch('/api/book-seat', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body:JSON.stringify({selectedSeatIds, creditCard, expiration})
    })
      
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if(data.success){
        bookingSuccess();
        markSeatUnavailable(selectedSeatIds);
      } else {
        // console.log(data.message);
        bookingError(data.message);
      };
    })
  };


  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Title>Purchase Ticket</Title>
      <DialogContent>{`You're purchasing ${selectedSeatIds.length} ticket(s) for the price of $${total}`}</DialogContent>
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
            <SeatsCheckout/>
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
        onChange={(ev)=> setExpiration(ev.target.value)}
        />
        <Button 
        type='submit' 
        variant="contained" 
        color="primary"

        >
            Purchase
        </Button>
        <p> {error? error : ''} </p>
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
  p {
    margin-top: .5rem;
    font-size: .75rem;
    font-style: italic;
    color: orange;
  }
`;



export default ModalContent;