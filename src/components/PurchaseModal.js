import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import {BookingContext} from './BookingContext';
import ModalContent from './ModalContent';

const PurchaseModal = () => {
  const {state, actions:{cancelBookingProcess, submitCardInfo},} = React.useContext(BookingContext);
  const {selectedSeatId, price,} = state;

  return (
    <Dialog
    open={selectedSeatId !== null} 
    onClose={cancelBookingProcess}
    >
      <ModalContent
      seatId={selectedSeatId}
      price={price}
      submitCardInfo={submitCardInfo}
      />
    </Dialog>
  )
};

export default PurchaseModal;