import React from 'react';

export const SeatContext = React.createContext(null);

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVE-SEAT-DATA-FROM-SERVER': {
            return {
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
            };
        }
        case 'MARK-SEAT-SELECTED': {
            return {
                ...state,
                // seats: {...state.seats, [action.seatId]:{id:seatId, isBooked: true}}
            };
        }
            
        default:
            return new Error(`action: "${action.type}" not recognised`)
    }
};

export const SeatProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const receiveSeatInfoFromServer = data => {
        dispatch({
            type: 'RECEIVE-SEAT-DATA-FROM-SERVER',
            ...data,
        });
    };

    const markSeatSelected = seatId => {
        dispatch({
            type: 'MARK-SEAT-SELECTED',
            seatId: seatId,
        });
    };


    return (
        <SeatContext.Provider
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer, markSeatSelected
                },
            }}
        >
            {children}
        </SeatContext.Provider>
    )
};