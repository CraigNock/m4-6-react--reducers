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
        case 'MARK-SEAT-UNAVAILABLE': {
            return {
                ...state,
                seats: {...state.seats, [action.seatId]:{id:action.seatId, isBooked: true, selected:true}},
                
            };
        }
        case 'MARK-SELECTED': {
            return {
                ...state,
                seats: {
                    ...state.seats, 
                    [action.seatId]:{id:action.seatId, selected:action.toggle}},
                
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

    const markSeatUnavailable = (seatId) => {
        // console.log('unavailable ', seatId);
        dispatch({
            type: 'MARK-SEAT-UNAVAILABLE',
            seatId: seatId,
        });
    };

    const markSelected = (seatId, toggle) => {
        dispatch({
            type: 'MARK-SELECTED',
            seatId: seatId,
            toggle: toggle,
        })
    };

    return (
        <SeatContext.Provider
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer, 
                    markSeatUnavailable,
                    markSelected,
                },
            }}
        >
            {children}
        </SeatContext.Provider>
    )
};