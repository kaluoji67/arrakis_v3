import React from 'react'
import { Button } from "react-bootstrap";
import { updateSecurityStatus } from '../../services/security-service';
import { useState, useEffect, useRef } from "react";

const SecurityDetails = (props) => {

  const [status, setStatus] = useState(props.info.status)

  const handleClick = (e) => {
    props.update(props.id)
  }

  const updateSecurity = () => {
    if(props.info.status === "processing"){
      return;
    }
    updateSecurityStatus(props.info.id)
      .then(res => {
        setStatus("processing")
      })
      .catch(err => {
        console.log(err);
      })
  }

  const myStatus = useRef(null);
  const redeemCol = useRef(null);

  useEffect(() => {
    myStatus.current.innerHTML = status
    if(status === "processing"){
      redeemCol.current.innerHTML = ""
    }
  },
    [status]
  );

  return (
    <tr onClick={handleClick}>
      <td>{props.index + 1}</td>
      <td>{props.info.isin}</td>
      <td>{props.info.cusip} </td>
      <td>{props.info.issuer_name}</td>
      <td>{props.info.maturity_date}</td>
      <td>{props.info.coupon}</td>
      <td>{props.info.type}</td>
      <td>{props.info.face_value}</td>
      <td>{props.info.currency}</td>
      <td ref={myStatus}>{props.info.status}</td>
      <td ref={redeemCol}>{props.info.status === "active" ? <Button onClick={updateSecurity} > Redeem </Button> : <></>}</td>
    </tr>
  )
}

export default SecurityDetails