import React from 'react'
import AllSecurities from './AllSecurities'
import Trades from '../trade/Trades'



const Securities = (props) => {
  const [currentState, setCurrentState] = useState(null);


  return (
    <>
      <div className='securities-container'>

        <div className='hot-all-securities'>
          <div className='hot-securities-container'>
            <h5> Hot Securities</h5>
            <div className='scroll-container'>
              <AllSecurities info={setCurrentState} />
            </div>
          </div>

          <div className='all-securities-container'>
            <h5> All Securities</h5>
              <AllSecurities info={setCurrentState}/>
          </div>
        </div>

        <div className='securities-trade-container'>
          <h5> Trades </h5>
          <div className='scroll-container'>
              <Trades info={currentState} />
            </div>
        </div>

      </div>
    </>
  )
}

export default Securities