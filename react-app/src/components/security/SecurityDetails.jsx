import React from 'react'

const SecurityDetails = (props) => {

  const handleClick = (e) => {
    props.update(props.id)
  }

  return (
    <tr onClick={handleClick}>
      <td>{props.index +1}</td>
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