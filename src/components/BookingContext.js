import React from 'react';

export const BookingContext = React.createContext(null);

const initialState = {
  status: 'idle',
  error: null,
  selectedSeatId: null,
  price: null,
};
//statuses: idle, seat-selected, awaiting response, error, purchased
//the different stages of the purchasing process
//could fit nicely in a reducer...

const reducer = (state,action) => {
  switch (action.type) {
    case 'BEGIN-BOOKING-PROCESS':
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
      case 'SUBMIT-CARD-INFO':
      return {
        ...state,
        status: 'awaiting-response',
      };
      case 'BOOKING-ERROR':
      return {
        ...state,
        status: 'error',
      };
      case 'BOOKING-SUCCESS':
      return {
        ...state,
        status: 'purchased',
      };
      case 'CANCEL-BOOKING':
      return {
        ...initialState,
        status: 'idle',
      };
  
    default:
      return new Error(`Action: ${action.type} not recognised`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (seatId, price) => {
    // console.log('book- seatId', seatId, 'price', price);
    dispatch({
      type:'BEGIN-BOOKING-PROCESS',
      selectedSeatId: seatId,
      price: price,
    })
  };

  const submitCardInfo = () => {
    console.log('submit');
    dispatch({
      type:'SUBMIT-CARD-INFO',
    })
  };

  const cancelBookingProcess = () => {
    console.log('cancel');
    dispatch({
      type:'CANCEL-BOOKING',
    })
  };

  return (
    <BookingContext.Provider
      value={{
        state:{...state}, 
        actions: {
          beginBookingProcess,
          submitCardInfo,
          cancelBookingProcess,
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  )

}

