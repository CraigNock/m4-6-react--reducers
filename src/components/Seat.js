import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import {Icon} from 'react-icons-kit';
import {checkCircle} from 'react-icons-kit/feather/checkCircle';


import seatImgSrc from '../assets/seat-available.svg';
import {BookingContext} from './BookingContext';


const Seat = ({seatId, price, booked, selected, markSelected}) => {
    const {actions: {beginBookingProcess}} = React.useContext(BookingContext);
    // console.log('seat-seatId', seatId, price);
    
    return (
        <StyledSeatDiv>
            <SeatButton disabled={booked} onClick={() => {
                selected? markSelected(seatId, false) : markSelected(seatId, true);
                beginBookingProcess(seatId, price);
                } }>
                <Tippy content={`Seat: ${seatId} at $${price}`}>
                    <SeatImg src={seatImgSrc} alt='seat' />
                </Tippy>
            </SeatButton>
            <StyledIconDiv style={ selected? {display: 'block'} : {display: 'none'} }>
                <Icon icon={checkCircle}/>
            </StyledIconDiv>
        </StyledSeatDiv>
    )
};

const StyledSeatDiv = styled.div`
    position: relative;
`;

const SeatImg = styled.img`
    
`;

const SeatButton = styled.button`
    position: relative;
    border: none;
    padding: 5px;
    :disabled {
        filter: grayscale(100%);
    }
`;

const StyledIconDiv = styled.div`
    /* display: none; */
    position: absolute;
    bottom: 6px;
    right: 3px;
    background-color: whitesmoke;
    padding: .05rem .2rem;
    border-radius: 50px;
    color: limegreen;
`;

export default Seat;