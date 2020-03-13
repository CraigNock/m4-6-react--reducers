
import React from 'react';

import GlobalStyles from './GlobalStyles';
import {SeatContext} from './SeatContext';
import TicketWidget from './TicketWidget';

function App() {
  const {
    actions:{receiveSeatInfoFromServer},
    state: { numOfRows },
  } = React.useContext(SeatContext);

  React.useEffect(()=> {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      });
// eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyles />
      <p>we got {numOfRows} rows here</p>
    </>
  );
}

export default App;




