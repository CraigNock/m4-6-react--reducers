import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Tippy from '@tippy.js/react';
// import 'tippy.js/dist/tippy.css';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import {SeatContext} from './SeatContext'
import Seat from './Seat';

const TicketWidget = () => {
  const {state, actions: {markSeatSelected}} = React.useContext(SeatContext);
  // console.log(state);
  const {hasLoaded, seats, numOfRows, seatsPerRow,} = state;
  // console.log(seats);


  if (!hasLoaded) {
    return <CircularProgress />
  }

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
                  markSeatSelected={markSeatSelected}
                  

                />
              );
            })}
          </Row>
        );
      })}
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: fit-content;
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

// const SeatWrapper = styled.button`
//   border: none;
//   padding: 5px;
//   :disabled {
//     filter: grayscale(100%);
//   }
// `;

export default TicketWidget;
