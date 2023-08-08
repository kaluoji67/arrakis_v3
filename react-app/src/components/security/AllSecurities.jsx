import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import SecurityDetails from './SecurityDetails';
import { auth } from '../../firebase';
import { getAllSecurities, getUserFromEmail, getIssuerNames, getSecuritiesByIssuerName, getSecuritiesByDateTypeIssuer } from '../../services/security-service';
import DateRangePickerOverlay from '../includes/DateRangePickerOverlay';
import { useLocalStore } from "mobx-react-lite";
import { CheckboxDropdown } from '../includes/CheckBoxDropDown';
import { Button } from "react-bootstrap";

const AllSecurities = (props) => {
    //loading securities
    const [securities, setSecurities] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

    //FILTER SECURITIES

    //first get list of issuers and types
    const setOfIssuerNames = new Set();
    setOfIssuerNames.add("BNPParibasIssu 4,37% Microsoft Corp (USD)")
    setOfIssuerNames.add("Airbus 3.15%  USD")
    setOfIssuerNames.add("UBS Facebook (USD)")
    setOfIssuerNames.add("Amazon")
    setOfIssuerNames.add("HM Treasury United Kingdon")
    setOfIssuerNames.add("TEMASEK FINL I LTD GLOBAL MEDIUM TERM NTS BOOK ENTRY REG S")
    setOfIssuerNames.add("First Norway Alpha Kl.IV")
    setOfIssuerNames.add("x0x0")
    const [selectedIssuerNames, setSelectedIssuerNames] = useState(setOfIssuerNames)



    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
        startDateString: "",
        endDateString: "",
        key: "selection",
    });
    const setNewDateRange = (newDateRange) => {
        setDateRange(newDateRange);
    }

    const filterParams = {
        user: user,
        dateRange: dateRange,
        issuerName: [...selectedIssuerNames],
        type: []
    }

    const issuerMethod = (issuer) => {
        if (selectedIssuerNames.has(issuer)) {
            selectedIssuerNames.delete(issuer);
            console.log("deleted")
        } else {
            selectedIssuerNames.add(issuer)
            console.log("added")
        }
        setSelectedIssuerNames([...selectedIssuerNames])
    }


    const issuerItems = useLocalStore(() => ({
        title: "select issuer",
        method: issuerMethod,
        items: [...setOfIssuerNames].map(issuer => ({ id: issuer, label: issuer, checked: true }))
    }));

    const applyFilter = (e) => {

        if (filterParams.dateRange.endDate && filterParams.dateRange.startDate) {
            prepareFilter(filterParams)

            getSecuritiesByDateTypeIssuer(filterParams)
                .then(res => {
                    setLoaded(true);
                    setSecurities(res.data);
                    console.log(res.data)
                    setError('');

                })
                .catch(err => {
                    setSecurities([]);
                    setError(err);
                    console.log(err);
                    setLoaded(false);
                })
        } else {
            filterParams.user = user.id
            getSecuritiesByIssuerName(filterParams)
                .then(res => {
                    setLoaded(true);
                    setSecurities(res.data);
                    console.log(res.data)
                    setError('');

                })
                .catch(err => {
                    setSecurities([]);
                    setError(err);
                    console.log(err);
                    setLoaded(false);
                })
        }

    }

    const prepareFilter = (parameters) => {
        let d = parameters.dateRange.startDate
        let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear()
        parameters.dateRange.startDateString = datestring;

        d = parameters.dateRange.endDate
        datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear()
        parameters.dateRange.endDateString = datestring;

        parameters.user = user.id
    }

    const getUserFromEmailAPI = () => {
        getUserFromEmail(auth.currentUser.email)
            .then(res => {
                setUser(res.data);
                console.log(res.data)
            })
            .catch(err => {
                setError(err);
                console.log(err);
                setLoaded(false);
            })
    }

    const getAllSecuritiesFromAPI = () => {
        const userId = user.id;
        //get hot securities
        if (!props.allFilters) {
            let dateOffset = (24 * 60 * 60 * 1000) * 5; //5 days
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setTime(fiveDaysAgo.getTime() - dateOffset);
            const nextFiveDays = new Date();
            nextFiveDays.setTime(nextFiveDays.getTime() + dateOffset);
            const range = {
                startDate: fiveDaysAgo,
                endDate: nextFiveDays
            }
            const params = {
                user: userId,
                dateRange: range,
                issuerName: [...selectedIssuerNames],
                type: []
            }
            prepareFilter(params)
            getSecuritiesByDateTypeIssuer(params)
                .then(res => {
                    setLoaded(true);
                    setSecurities(res.data);
                    console.log(params)
                    console.log(res.data)
                    setError('');

                })
                .catch(err => {
                    setSecurities([]);
                    setError(err);
                    console.log(err);
                    setLoaded(false);
                })
            return;
        }

        getAllSecurities(userId)
            .then(res => {
                setLoaded(true);
                setSecurities(res.data);
                setError('');
            })
            .catch(err => {
                setSecurities([]);
                setError(err);
                console.log(err);
                setLoaded(false);
            })
    }

    useEffect(() => {
        getUserFromEmailAPI();
    },
        []
    );
    useEffect(() => {
        if (!user) {
            return;
        }
        getAllSecuritiesFromAPI();
        filterParams.user = user.id
        //getIssuerNamesAPI();

    },
        [user]
    );
    useEffect(() => {
        filterParams.issuerName = [...selectedIssuerNames]
        console.log(filterParams)
    },
        [selectedIssuerNames]
    );
    useEffect(() => {
        filterParams.dateRange = dateRange
        console.log(filterParams)
    },
        [dateRange]
    );
    useEffect(() => {
        //Update current security id
        if (securities.length > 0)
            props.update(securities[0])
    },
        [securities]
    );



    //Search Function
    const [q, setQ] = useState("");
    const [searchParam] = useState(["isin", "cusip", "currency", "issuer_name", "status"]);

    useEffect(() => {
        // our fetch codes
    }, []);

    function search(securities) {
        return securities.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        })
    };

    //Click Function
    const updateCurrentSecurity = (id) => {
        props.update(id)
    }

    if (error && !loaded) {
        return (
            <div className='x'>
                <p>
                    ERROR LOADING SECURITIES
                </p>
            </div>
        )
    }
    if (!loaded && !error) {
        return (
            <div className='x'>
                <p>
                    LOADING SECURITIES
                </p>
            </div>
        )
    }
    if (loaded) {
        return (

            <>
                <div className='securities-filter-container'>

                    <div className='search-bar-container'>
                        <form className='search-form'>
                            <div className="mb-3">
                                <input type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    className="form-control" placeholder="Search" />
                            </div>
                        </form>
                    </div>
                    <div className='vl-white'></div>

                    <div className='securities-attributes-container'>

                        {
                            props.allFilters ? (
                                <>
                                    <div className="date-range-container">
                                        <DateRangePickerOverlay method={setNewDateRange} />
                                    </div>

                                    <div className="issuer-name-container">
                                        <div><span className="filter-label">Issuer Name</span></div>
                                        <CheckboxDropdown info={issuerItems} />
                                    </div>
                                    {/* <div className="type-container">
                                        <div><span className="filter-label">Type</span></div>
                                        <CheckboxDropdown info={type} />
                                    </div> */
                                    }
                                    <div className="apply-filter-btn-container">
                                        <Button id='btn-filter-white' onClick={applyFilter}>
                                            apply
                                        </Button>
                                    </div>
                                </>) : <></>
                        }



                    </div>
                </div>

                <div className='all-securities-table-container'>
                    <Table striped bordered hover className='all-securities-table'>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>ISIN</th>
                                <th>CUSIP</th>
                                <th>Issuer Name</th>
                                <th>Maturity Date</th>
                                <th>Coupon</th>
                                <th>Type</th>
                                <th>Face Value</th>
                                <th>Currency</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                props.allFilters ?
                                
                                search(securities).map((security, index) => (
                                    < SecurityDetails info={security} key={security.id} id={security.id} index={index} update={updateCurrentSecurity} />
                                ))

                                :
                                
                                search(securities).filter(sec => sec.status === "active" ).map((security, index) => (
                                    < SecurityDetails info={security} key={security.id} id={security.id} index={index} update={updateCurrentSecurity} />
                                ))

                            }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}


export default AllSecurities