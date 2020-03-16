import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import {BookingContext} from './BookingContext';
import ModalContent from './ModalContent';

const PurchaseModal = () => {
  const {
    state, 
    actions:{
      submitCardInfo, 
      bookingSuccess,
      bookingError,
      cancelBookingProcess, 
    },
  } = React.useContext(BookingContext);

  const {
    status,
    error,
    selectedSeatId, 
    price,
  } = state;

  return (
    <Dialog
    open={selectedSeatId !== null} 
    onClose={cancelBookingProcess}
    >
      <ModalContent
      status={status}
      error={error}
      seatId={selectedSeatId}
      price={price}
      submitCardInfo={submitCardInfo}
      bookingSuccess={bookingSuccess}
      bookingError={bookingError}
      />
    </Dialog>
  )
};

export default PurchaseModal;