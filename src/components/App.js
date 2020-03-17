
import React from 'react';

import GlobalStyles from './GlobalStyles';
import {SeatContext} from './SeatContext';
import {BookingContext} from './BookingContext';
import PurchaseModal from './PurchaseModal';
import TicketWidget from './TicketWidget';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App() {
  const {actions:{receiveSeatInfoFromServer},} = React.useContext(SeatContext);

  const {state:{status}, actions:{cancelBookingProcess}} = React.useContext(BookingContext);

  React.useEffect(()=> {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        receiveSeatInfoFromServer(data);
      });
// eslint-disable-next-line
  }, []);

  //SNACKBAR
  const [open, setOpen] = React.useState(false);
  const handleSnackClose = (event, reason) => {
    console.log('snack close');
    if (reason === 'clickaway') {
      return;
    };
    cancelBookingProcess();
  };
  React.useEffect(() => {
    (status === 'purchased') ? setOpen(true) : setOpen(false);
  }, [status]);

  return (
    <>
      <GlobalStyles />
      <PurchaseModal/>
      <TicketWidget />
      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          Successfully purchased ticket! Enjoy the show.
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;




