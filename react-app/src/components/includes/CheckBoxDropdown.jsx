import { observer } from "mobx-react-lite";
import React from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { runInAction, action } from "mobx"

const CheckboxMenu = React.forwardRef(
    (
        {
            children,
            style,
            className,
            "aria-labelledby": labeledBy,
            onSelectAll,
            onSelectNone
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                style={style}
                className={`${className} CheckboxMenu`}
                aria-labelledby={labeledBy}
            >
                <div
                    className="d-flex flex-column"
                    style={{ maxHeight: "calc(100vh)", overflow: "none" }}
                >
                    <ul
                        className="list-unstyled flex-shrink mb-0"
                        style={{ overflow: "auto" }}
                    >
                        {children}
                    </ul>
                    <div className="dropdown-item border-top pt-2 pb-0" >
                        <ButtonGroup size="sm">
                            <Button variant="link" onClick={onSelectAll}>
                                Select All
                            </Button>
                            <Button variant="link" onClick={onSelectNone}>
                                Select None
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
);

const CheckDropdownItem = React.forwardRef(
    ({ children, id, checked, onChange }, ref) => {
        return (
            <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
                <Form.Check
                    type="checkbox"
                    label={children}
                    checked={checked}
                    onChange={onChange && onChange.bind(onChange, id)}
                />
            </Form.Group>
        );
    }
);

export const CheckboxDropdown = observer(({ info }) => {
    const items = info.items;
    const handleChecked = (key, event) => {
        // items.find(i => i.id === key).checked = event.target.checked;
        for (const item in items) {
            if (items[item].id == key) {
                runInAction(() => {
                    console.log(items[item].label)
                    info.method(items[item].label);
                    items[item].checked = event.target.checked;
                })
                break;
            }
        }
    };

    const handleSelectAll = () => {
        items.forEach(i => {
            i.checked = true;
            info.method(i.label);
        });
    };

    const handleSelectNone = () => {
        items.forEach(i => {
            i.checked = false;
            info.method(i.label);
        })
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="check-box-div">
                {info.title}
            </Dropdown.Toggle>

            <Dropdown.Menu
                as={CheckboxMenu}
                onSelectAll={handleSelectAll}
                onSelectNone={handleSelectNone}
            >
                {items.filter(i => i.label != "x0x0").map(i =>  (
                    <Dropdown.Item
                        key={i.id}
                        as={CheckDropdownItem}
                        id={i.id}
                        checked={i.checked}
                        onChange={handleChecked}
                    >
                        {i.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
});
