import Dropdown from 'react-bootstrap/Dropdown';


function BasicDropDown(props) {
  const handleClick = (event) => {
    props.method(event.target.id)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
        [...props.items].map(item => 
        (
          <Dropdown.Item onClick={props.method} id={item} key={item}> {item} </Dropdown.Item>
        ))
      }
        
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicDropDown;