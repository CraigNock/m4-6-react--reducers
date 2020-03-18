import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import {SeatContext} from './SeatContext';
import {BookingContext} from './BookingContext';
import Seat from './Seat';

const TicketWidget = () => {
  const {state, actions:{markSelected}} = React.useContext(SeatContext);
  // console.log(state);
  const {hasLoaded, seats, numOfRows, seatsPerRow,} = state;
  // console.log(seats);
  const {actions: {beginPurchase}} = React.useContext(BookingContext);

  if (!hasLoaded) {
    return <CircularProgress />
  }


  // const purchaseTime = () => {

  //   beginPurchase();
  // }


  return (
    <Wrapper>
      
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);
        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName} </RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              // console.log('seatId first', seatId);
              const seat = seats[seatId];
              return (
                  <Seat
                    key={seatId}
                    seatId={seatId}
                    price={seat.price}
                    booked={seat.isBooked}
                    selected={seat.selected}
                    markSelected={markSelected}
                    
                  />
              );
            })}
          </Row>
        );
      })}
      <StyledPurchaseButton
      onClick={() => beginPurchase()}
      >
        Purchase
      </StyledPurchaseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: fit-content;
  margin: 10vh auto;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  color: gray;
  padding-right:.5rem;
`;

const StyledPurchaseButton = styled.button`
  border: 2px solid forestgreen;
  border-radius: 5px;
  padding: .5rem 2rem;
  margin: 1rem;
  font-weight: bold;
  font-size: 1rem;
  color: forestgreen;
`;

export default TicketWidget;
