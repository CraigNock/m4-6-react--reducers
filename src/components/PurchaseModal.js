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
    selectedSeatIds, 
    price,
  } = state;

  return (
    <Dialog
    open={status === 'begin-purchase' || status === 'awaiting-response' || status === 'error'} 
    onClose={cancelBookingProcess}
    >
      <ModalContent
      status={status}
      error={error}
      selectedSeatIds={selectedSeatIds}
      price={price}
      submitCardInfo={submitCardInfo}
      bookingSuccess={bookingSuccess}
      bookingError={bookingError}
      />
    </Dialog>
  )
};

export default PurchaseModal;