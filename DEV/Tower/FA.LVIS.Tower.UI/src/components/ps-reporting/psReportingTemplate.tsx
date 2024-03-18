import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBars, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './YourComponent.css'; // Assuming you have accompanying CSS for layout and design
interface Props {
  loggedTenant: string;
  togglingTenant: string;
  title: string;
  hasAccess: boolean;
  inValidBtnEnable: boolean;
  onSwitchGridInfo: (param: string) => void;
  onSearch: () => void;
  onLoadRFOrder: () => void;
  onSearchByReferenceNo: () => void;
  onInvalidateConfirm: () => void;
  dateFilterSelection: Array<{ value: string; title: string }>;
  referenceNoFilterSelection: Array<{ value: string; title: string }>;
}
const YourComponent: React.FC<Props> = ({ loggedTenant, togglingTenant, title, hasAccess, inValidBtnEnable, onSwitchGridInfo, onSearch, onLoadRFOrder, onSearchByReferenceNo, onInvalidateConfirm, dateFilterSelection, referenceNoFilterSelection }) => {
  const [showDates, setShowDates] = useState(false);
  const [showRefNum, setShowRefNum] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [throughDate, setThroughDate] = useState<Date | null>(null);
  const [filterSection, setFilterSection] = useState('');
  const [filterReferenceNoSection, setFilterReferenceNoSection] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [busy, setBusy] = useState(false);
  const [busyRef, setBusyRef] = useState(false);
  // Handle display toggle between date and reference number search
  const handleShowHide = (type: 'showdates' | 'showrefnum') => {
    if (type === 'showdates') {
      setShowDates(!showDates);
      setShowRefNum(false);
    } else if (type === 'showrefnum') {
      setShowRefNum(!showRefNum);
      setShowDates(false);
    }
  };
  return (
    <div className="your-component-container">
      <div className="breadcrumb">
        {loggedTenant === 'LVIS' && (
          <>
            {togglingTenant === 'LVIS' && <button onClick={() => onSwitchGridInfo('')}>Orders Summary</button>}
            {togglingTenant === 'RF' && <button onClick={() => onSwitchGridInfo('')}>Orders Summary</button>}
            <button onClick={() => onSwitchGridInfo('RF')}>RF Orders Summary</button>                
          </>
        )}
        {loggedTenant !== 'LVIS' && (
          <button onClick={onSearch}>Orders Summary</button>
        )}
      </div>
      <div className="wrapper">
        <h1>{title}</h1>
        <div className="form-group">
          <div className="icon-wrapper" onClick={() => handleShowHide('showdates')}>
            <FontAwesomeIcon icon={faCalendar} title="Search By Date Range" />
            | <FontAwesomeIcon icon={faBars} title="Search By Reference Number" onClick={() => handleShowHide('showrefnum')} />
          </div>
          {showDates && (
            <div className="date-picker-group">
              <DatePicker selected={fromDate} onChange={(date: Date) => setFromDate(date)} dateFormat="MM/dd/yyyy" />
              <DatePicker selected={throughDate} onChange={(date: Date) => setThroughDate(date)} dateFormat="MM/dd/yyyy" />
              <select value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                {dateFilterSelection.map(option => (
                  <option key={option.value} value={option.value}>{option.title}</option>
                ))}
              </select>
              {/* Search button functionality based on condition */}
              <button onClick={() => togglingTenant === 'RF' ? onLoadRFOrder() : onSearch}>
                <FontAwesomeIcon icon={busy ? faSpinner : faSearch} spin={busy} />
              </button>
            </div>
          )}
          {showRefNum && (
            <div>
              <select value={filterReferenceNoSection} onChange={e => setFilterReferenceNoSection(e.target.value)}>
                {referenceNoFilterSelection.map(option => (
                  <option key={option.value} value={option.value}>{option.title}</option>
                ))}
              </select>
              <input value={referenceNo} onChange={e => setReferenceNo(e.target.value)} type="text" />
              {/* Search by Reference No */}
              <button onClick={onSearchByReferenceNo}>
                <FontAwesomeIcon icon={busyRef ? faSpinner : faSearch} spin={busyRef} />
              </button>
            </div>
          )}
          {hasAccess && (
            <button onClick={onInvalidateConfirm} disabled={inValidBtnEnable}>Invalidate Order</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default YourComponent;