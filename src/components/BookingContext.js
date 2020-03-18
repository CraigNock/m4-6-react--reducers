import React from 'react';

export const BookingContext = React.createContext(null);

const initialState = {
  status: 'idle',
  error: null,
  selectedSeatIds: [],
  price: null,
};

const reducer = (state,action) => {
  switch (action.type) {
    case 'BEGIN-BOOKING-PROCESS':
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatIds: action.newSelected,
      };
      case 'BEGIN-PURCHASE-PROCESS':
      return {
        ...state,
        status: 'begin-purchase',
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
        ...state,
        status: 'idle',
      };
  
    default:
      return new Error(`Action: ${action.type} not recognised`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (seatId, seatPrice) => {
    // console.log('book- seatId', seatId, 'price', price);
    const newSelected = [...state.selectedSeatIds];
    const toggleIndex = newSelected.findIndex(selected => selected.id === seatId);

    if(toggleIndex === -1){
      newSelected.push({id:seatId, price: seatPrice})
    } else {
      newSelected.splice(toggleIndex, 1);
    }
    // console.log(newSelected);
    dispatch({
      type:'BEGIN-BOOKING-PROCESS',
      newSelected: newSelected,
    })
  };

  const beginPurchase = () => {
    dispatch({
      type: 'BEGIN-PURCHASE-PROCESS'
    })
  }

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
          beginPurchase,
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

