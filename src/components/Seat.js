import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';


import seatImgSrc from '../assets/seat-available.svg'


const Seat = ({seatId, price, booked}) => {

    return (
        <SeatWrapper disabled={booked} >
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