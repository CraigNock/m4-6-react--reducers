import React from 'react';

export const SeatContext = React.createContext();

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
                hasLoaded: true,
                seats: action.bookedSeats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
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
    }

    return (
        <SeatContext.Provider
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer
                },
            }}
        >
            {children}
        </SeatContext.Provider>
    )
};