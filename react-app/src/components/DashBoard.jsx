import React from 'react'
import {useState} from 'react';
import Securities from './security/Securities';
import Trades from './trade/Trades';

const DashBoard = (props) => {
  const types = ["Bonds", "Trades", "User Management", "Settings"];
  const [active, setActive] = useState(types[0]);

  return (
    <>
      <div className="tabs">
        <div className="tabs-nav">
          {types.map((type) => (
            <div
              className={`${active === type ? "nav-item active" : "nav-item"}`}
              id={type}
              key={type}
              onClick={() => setActive(type)}
            >
              {type}
            </div>
          ))}
        </div>
        <div className="tabs-content-container">
          {active === "Bonds" && <div className="tab-1 tabs-content"> <Securities info={props.info} /> </div>}
          {active === "Trades" && <div className="tab-2 tabs-content"> <Trades alltrades={true} currentSecurity={-1}/> </div>}
          {active === "User Management" && <div className="tab-3 tabs-content"> User Management </div>}
          {active === "Settings" && <div className="tab-4 tabs-content"> Settings </div>}
        </div>
      </div>
    </>
    
  )
}

export default DashBoard