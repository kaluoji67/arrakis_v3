import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { ReactDOM } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button, Container, Form } from "react-bootstrap";

const DateRangePickerOverlay = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [show, setShow] = useState(false);

  const handleFocus = () => {
    setShow(true);
  };

  const handleSelect = () => {
    setShow(false);
  };

  const close = () => {
    setShow(false);
  };

  const handleRangeChange = (item) => {
    setState([item.selection]);
    props.method(item.selection)
    let dateString = " - ";
    if (item.selection.startDate) {
      dateString = item.selection.startDate.toLocaleDateString() + dateString
    }
    if (item.selection.endDate) {
      dateString = dateString + item.selection.endDate.toLocaleDateString()
    }
    setDateRangeString(dateString)

    handleSelect();
  };
  const inputHandler = event => {
    event.target.value = dateRangeString;
    // remove function call from here
  };

  const [dateRangeString, setDateRangeString] = useState("-");
  const myField = useRef(null);

  useEffect(() => {
    myField.current.value = dateRangeString;
  }, [dateRangeString])

  return (
    <Container className="date-form-picker-container">
      <Form className="date-range-form">
        <Form.Group className="date-range-form-group">
        <span className="filter-label">Select Date</span>
          <Form.Control
            ref={myField}
            type="text"
            onFocus={handleFocus}
            readOnly
          />
        </Form.Group>
      </Form>
      {show && (
        <div className="date-picker-container">
        <Button className="date-picker-close-btn" onClick={close} >X</Button>
        <DateRange
          editableDateInputs={true}
          onChange={handleRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        </div>
      )}
      {/* <Button onClick={handleSelect}>Select Dates</Button>
      {state[0].startDate && state[0].endDate && (
        <p>
          Selected range: {state[0].startDate.toLocaleDateString()} -{" "}
          {state[0].endDate.toLocaleDateString()}
        </p>
      )} */}
    </Container>
  );
};

export default DateRangePickerOverlay;
