import React from 'react'
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button, Container } from "react-bootstrap";
import { useState } from 'react';

const MyDateRangePicker = ({onSelect}) => {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);

    const handleSelect = () => {
        onSelect(state[0]);
    };

    return (
        <Container>
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
          <Button onClick={handleSelect}>Get range</Button>
          {state[0].startDate && state[0].endDate && (
            <p>
              Selected range: {state[0].startDate.toLocaleDateString()} -{" "}
              {state[0].endDate.toLocaleDateString()}
            </p>
          )}
        </Container>
      );
}

export default MyDateRangePicker