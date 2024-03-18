import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilSquare, faSpinner, faRefresh, faPaperclip, faArrowRight, faArrowLeft, faTime } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';
type Props = {
  loading: boolean,
  messageDetails?: {
    ReportDetails: {
      ServiceRequestId: string,
      createddate: string, // Assuming this is a string that needs to be formatted.
      service: string,
      ApplicationId: string,
      CustomerId: string,
      ExternalRefNum: string,
      CustomerRefNum: string,
      InternalRefNum: string,
      InternalRefId: string,
    },
    MessageLogDetails: Array<{
      IsIncoming: boolean,
      ExceptionDescription?: string,
      MessageLogId: string,
      CreatedDateTime: string,
      ExternalApplication: string,
      Description: string,
      DocumentobjectId: string,
      hasChild?: boolean,
      ParentMessageLogId?: string,
    }>
  },
  Refresh: () => void,
  setContent: (documentObjectId: string, type: 'Received Message' | 'Sent Message') => void,
  scrollTo: (id: string) => void,
}
const OrderActivityComponent: React.FC<Props> = ({ loading, messageDetails, Refresh, setContent, scrollTo }) => {
  const [showMessages, setShowMessages] = useState<Record<string, boolean>>({});
  return (
    <div>
      <div id="modalId" className="widget-header">
        <button type="button" onClick={() => scrollTo('modalId')} className="close" data-dismiss="modal">
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
        <FontAwesomeIcon icon={faPencilSquare} size="2x" />
        <h3>Order Activity</h3>
      </div>
      {loading && (
        <div style={{ margin: 'auto', width: '10%', padding: '50px' }}>
          <FontAwesomeIcon icon={faSpinner} spin size="4x" className="margin-bottom" />
          Loading...
        </div>
      )}
      {!loading && messageDetails && (
        <div className="widget-content">
          <div className="well well-sm">
            <b>Order Information</b>
          </div>
          {messageDetails.ReportDetails && (
            <div className="row">
              <div className="col-md-5">
                <label>Service Request Id: </label> {messageDetails.ReportDetails.ServiceRequestId}<br />
                <label>Order Date: </label> {new Date(messageDetails.ReportDetails.createddate).toLocaleDateString()}<br />
                <label>Service Type: </label> {messageDetails.ReportDetails.service}<br />
                <label>Application: </label> {messageDetails.ReportDetails.ApplicationId}
              </div>
              <div className="col-md-4">
                <label>Customer Id: </label> {messageDetails.ReportDetails.CustomerId}<br />
                <label>External Reference Number: </label> {messageDetails.ReportDetails.ExternalRefNum}<br />
                <label>Customer Reference Number: </label> {messageDetails.ReportDetails.CustomerRefNum}<br />
              </div>
              <div className="col-md-3">
                <label>Internal Reference Number: </label> {messageDetails.ReportDetails.InternalRefNum}<br />
                <label>Internal Reference Id: </label> {messageDetails.ReportDetails.InternalRefId}<br />
              </div>
            </div>
          )}
          <br />
          <div className="well well-sm">
            <b>Message Flow</b>
            <button type="button" style={{ float: "right", border: 0, color: "black", backgroundColor: "none" }} title="Refresh" onClick={Refresh}>
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
          <div className="row">
            <div className="col-lg-5 text-center text-info">
              <h5>Incoming to LVIS</h5>
            </div>
            <div className="col-lg-2 text-center text-info">
              <h5>LVIS</h5>
            </div>
            <div className="col-lg-5 text-center text-info">
              <h5>Outgoing from LVIS</h5>
            </div>
          </div>
          {messageDetails.MessageLogDetails.map((MessageLogs, index) => (
            <ul className="timeline" key={index}>
              {MessageLogs.IsIncoming ? (
                <li>
                  <div className={`timeline-badge ${MessageLogs.ExceptionDescription ? 'danger' : 'success'}`}>
                    <Tooltip title={MessageLogs.ExceptionDescription || 'Incoming To LVIS'}>
                      <FontAwesomeIcon icon={MessageLogs.ExceptionDescription ? faArrowRight : faArrowRight} />
                    </Tooltip>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <p><small className="text-muted"><FontAwesomeIcon icon={faTime} />{MessageLogs.MessageLogId},{new Date(MessageLogs.CreatedDateTime).toLocaleDateString()}</small></p>
                    </div>
                    <div className="timeline-body">
                      <div>
                        <label>
                          <a href="#" onClick={() => setShowMessages(prev => ({ ...prev, [MessageLogs.MessageLogId]: !prev[MessageLogs.MessageLogId] }))}>
                            Incoming from {MessageLogs.ExternalApplication}, Message type: {MessageLogs.Description}
                          </a>
                        </label>
                      </div>
                      <p className="text-right">
                        <a href="#" onClick={() => setContent(MessageLogs.DocumentobjectId, 'Received Message')}>
                          <Tooltip title="Attachment(s)">
                            <FontAwesomeIcon icon={faPaperclip} />
                          </Tooltip>
                        </a>
                      </p>
                      {showMessages[MessageLogs.MessageLogId] && (
                        <div>
                          {/* Additional nested logs rendering can be placed here */}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ) : (
                <li className="timeline-inverted">
                  <div className={`timeline-badge ${MessageLogs.ExceptionDescription ? 'danger' : 'success'}`}>
                    <Tooltip title={MessageLogs.ExceptionDescription || 'Outgoing From LVIS'}>
                      <FontAwesomeIcon icon={MessageLogs.ExceptionDescription ? faArrowLeft : faArrowLeft} />
                    </Tooltip>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <p><small className="text-muted"><FontAwesomeIcon icon={faTime} />{MessageLogs.MessageLogId}, {new Date(MessageLogs.CreatedDateTime).toLocaleDateString()}</small></p>
                    </div>
                    <div className="timeline-body">
                      <div>
                        <label>
                          <a href="#" onClick={() => setShowMessages(prev => ({ ...prev, [MessageLogs.MessageLogId]: !prev[MessageLogs.MessageLogId] }))}>
                            Outgoing message to {MessageLogs.ExternalApplication}, Message type: {MessageLogs.Description}
                          </a>
                        </label>
                      </div>
                      <p className="text-right">
                        <a href="#" onClick={() => setContent(MessageLogs.DocumentobjectId, 'Sent Message')}>
                          <Tooltip title="Attachment(s)">
                            <FontAwesomeIcon icon={faPaperclip} />
                          </Tooltip>
                        </a>
                      </p>
                      {showMessages[MessageLogs.MessageLogId] && (
                        <div>
                          {/* Additional nested logs rendering can be placed here */}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
export default OrderActivityComponent;