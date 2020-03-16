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
        error: action.error,
      };
      case 'BOOKING-SUCCESS':
      return {
        ...initialState,
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

  const bookingSuccess = () => {
    console.log('success');
    dispatch({
      type:'BOOKING-SUCCESS',
    })
  };

  const bookingError = (message) => {
    console.log('error');
    dispatch({
      type:'BOOKING-ERROR',
      error: message,
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
          bookingSuccess,
          bookingError,
          cancelBookingProcess,
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  )

}

