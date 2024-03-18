import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Growl from 'react-growl-notification'; // This library doesn't exist in real. It's a placeholder for a growl-like notification library of your choice.
import { CustomGrid } from './CustomGrid'; // Assume CustomGrid is a react component that you wrote to handle grid functionality.
const ReportingComponent = () => {
    const [orderToInvalidate, setOrderToInvalidate] = useState([]);
    const [inValidBtnEnable, setInValidBtnEnable] = useState(true);
    const [loggedTenant, setLoggedTenant] = useState('');
    const [togglingTenant, setTogglingTenant] = useState('');
    const [hasAccess, setHasAccess] = useState(false);
    const [hasSuperAccess, setHasSuperAccess] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [throughDate, setThroughDate] = useState(new Date());
    const [busy, setBusy] = useState(false);
    const [gridData, setGridData] = useState([]);
    const [filterSection, setFilterSection] = useState('7');
    const [validateError, setValidateError] = useState(false);
    useEffect(() => {
        const activityRight = sessionStorage.getItem('activityright');
        if (activityRight) {
            const hasAdminAccess = ['Admin', 'SuperAdmin'].includes(activityRight);
            const hasSuperAdminAccess = activityRight === 'SuperAdmin';
            setHasAccess(hasAdminAccess);
            setHasSuperAccess(hasSuperAdminAccess);
        }
    }, []);
    const inValidateConfirm = () => {
        if (window.confirm('Are you sure you want to Invalidate selected order(s)?')) {
            inValidateProcess();
        }
    };
    const inValidateProcess = () => {
        console.log("entered invalidate process method.");
        setBusy(true);
        axios.post('ReportingController/InvalidateOrderData', orderToInvalidate)
            .then((response) => {
                setOrderToInvalidate([]);
                if (response.data.length > 0) {
                    // Handle error growl
                } else {
                    // Handle success growl
                    fetchData(); // A function to fetch grid data again
                }
                setBusy(false);
            });
    };
    const fetchData = () => {
        setBusy(true);
        const endpoint = filterSection === "1" ?
            `ReportingController/GetReportDetails/${togglingTenant}` :
            `ReportingController/GetReportDetailsFilter/${filterSection}/${togglingTenant}`;
        let payload = {};
        if (filterSection === "1") {
            payload = { Fromdate: fromDate.toISOString(), ThroughDate: throughDate.toISOString() };
        }
        axios.post(endpoint, payload)
            .then((response) => {
                setGridData(response.data);
                setBusy(false);
            });
    };
    const validateDate = () => {
        setValidateError(throughDate < fromDate);
    };
    useEffect(() => {
        validateDate();
    }, [fromDate, throughDate]);
    const dateFilterOptions = [
        { title: 'Custom', value: '1' },
        { title: 'Last 90 Days', value: '90' },
        // Add other date filters as per the list given in Angular
    ];
    // Assume CustomGrid is a React component that handles all grid functionalities including column definitions, data loading, etc.
    return (
        <div>
            <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
            <DatePicker selected={throughDate} onChange={date => setThroughDate(date)} />
            <Button onClick={fetchData}>Search</Button>
            <Button disabled={inValidBtnEnable} onClick={inValidateConfirm}>Invalidate Orders</Button>
            {busy && <p>Loading...</p>}
            <CustomGrid data={gridData} />
            {/* Assuming CustomGrid component handles selection and other interactions internally */}
            <Growl message={'Notification Example'} type={'success'} />
        </div>
    );
};
export default ReportingComponent;