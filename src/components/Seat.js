import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';


import seatImgSrc from '../assets/seat-available.svg';
import {BookingContext} from './BookingContext';



const Seat = ({seatId, price, booked,}) => {
    const {actions: {beginBookingProcess}} = React.useContext(BookingContext);
    // console.log('seat-seatId', seatId, price);
    return (
        <SeatWrapper disabled={booked} onClick={() => beginBookingProcess(seatId, price)} >
            <Tippy content={`Seat: ${seatId} at $${price}`}>
                <SeatImg  src={seatImgSrc} alt='seat' />
            </Tippy>
        </SeatWrapper>
    )
}

const SeatImg = styled.img`
    
`;

const SeatWrapper = styled.button`
    border: none;
    padding: 5px;
    :disabled {
        filter: grayscale(100%);
    }
`;

export default Seat;