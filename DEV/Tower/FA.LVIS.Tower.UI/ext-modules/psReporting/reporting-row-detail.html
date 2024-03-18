import React, { FC } from 'react';
Interface for props of the React Component, adjusting based on the expected 
interface ServiceInfoProps {
  data: {
    ServiceRequestId: number;
    createddate: string; // assuming ISO format for date
    service: string;
    ApplicationId: number;
    CustomerId: number;
    ExternalRefNum: string;
    CustomerRefNum: string;
    InternalRefNum: string;
    InternalRefId: number;
  };
  active: string;
  isOddRow: boolean;
ServiceInfoRow: Functional component that receives props including the service data
const ServiceInfoRow: FC<ServiceInfoProps> = ({ data, active, isOddRow }) => {
  // Prepare conditional classes and visibility based on props
  const conditionalClass = isOddRow ? 'alt' : '';
  const isVisible = active === data.CustomerName;
  // Convert date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <React.Fragment>
      {isVisible && (
        <div className={`row ${conditionalClass}`}>
          <br />
          <div className="col-md-5">
            <label>Service Request Id: </label> {data.ServiceRequestId}<br />
            <label>Order Date: </label> {formatDate(data.createddate)}<br />
            <label>Service Type: </label> {data.service}<br />
            <label>Application: </label> {data.ApplicationId}
          </div>
          <div className="col-md-4">
            <label>Customer Id: </label> {data.CustomerId} <br />
            <label>External Reference Number: </label> {data.ExternalRefNum} <br />
            <label>Customer Reference Number: </label> {data.CustomerRefNum}<br />
          </div>
          <div className="col-md-3">
            <label>Internal Reference Number: </label> {data.InternalRefNum}<br />
            <label>Internal Reference Id: </label> {data.InternalRefId}<br />
          </div>    
        </div>
      )}
    </React.Fragment>
  );
};
export default ServiceInfoRow;