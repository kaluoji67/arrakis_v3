import React, { useState } from 'react'
import AllSecurities from './AllSecurities'
import Trades from '../trade/Trades'

const Securities = (props) => {
  const[currentSecurity, setCurrentSecurity] = useState(-1);
  const updateCurrentSecurity = (id) => {
    setCurrentSecurity(id);
  }


  return (
    <>
      <div className='securities-container'>

        <div className='hot-all-securities'>
          <div className='hot-securities-container'>
            <h5> Hot Securities</h5>
              <AllSecurities info={props.info} allFilters={false} update={updateCurrentSecurity}/>
          </div>

          <div className='all-securities-container'>
            <h5> All Securities</h5>
              <AllSecurities info={props.info} allFilters={true} update={updateCurrentSecurity} />
          </div>
        </div>

        <div className='securities-trade-container'>
          <h5> Trades </h5>
          <Trades allTrades={false} currentSecurity={currentSecurity}/>
        </div>

      </div>
    </>
  )
}

export default Securities