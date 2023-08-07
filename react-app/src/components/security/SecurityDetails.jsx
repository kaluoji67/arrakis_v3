import React from 'react'
import showTrades from './AllSecurities'


const SecurityDetails = (props) => {


  const showTrades = ( props) =>{
      setCurrentState(currentState )
  } 

  return (
    <tr onClick={showTrades(security.id)}>
      <td>{props.info.isin}</td>
      <td>{props.info.cusip} </td>
      <td>{props.info.issuer_name}</td>
      <td>{props.info.maturity_date}</td>
      <td>{props.info.coupon}</td>
      <td>{props.info.type}</td>
      <td>{props.info.face_value}</td>
      <td>{props.info.currency}</td>
      <td>{props.info.status}</td>
    </tr>
  )
}

export default SecurityDetails