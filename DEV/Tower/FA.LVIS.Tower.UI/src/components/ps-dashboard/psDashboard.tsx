import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activityRight, setActivityRight] = useState('');
  const [canManageTEQ, setCanManageTEQ] = useState(false);
  const [canManageBEQ, setCanManageBEQ] = useState(false);
  const [BEQSummaryList, setBEQSummaryList] = useState(null);
  const [TEQSummaryList, setTEQSummaryList] = useState(null);
  const [BEQGraphData, setBEQGraphData] = useState([]);
  const [TEQGraphData, setTEQGraphData] = useState([]);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/userInfo');
        setCurrentUser(response.data);
        setActivityRight(response.data.activityRight);
        setCanManageTEQ(response.data.canManageTEQ);
        setCanManageBEQ(response.data.canManageBEQ);
        loadBEQExceptions();
        loadTEQExceptions();
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchCurrentUser();
  }, []);
  const loadBEQExceptions = async () => {
    try {
      const response = await axios.get('/Dashboard/BEQException/');
      setBEQSummaryList(response.data);
    } catch (error) {
      console.error('Failed to load BEQ exceptions:', error);
    }
  };
  const loadTEQExceptions = async () => {
    try {
      const response = await axios.get('/Dashboard/TEQException/');
      setTEQSummaryList(response.data);
    } catch (error) {
      console.error('Failed to load TEQ exceptions:', error);
    }
  };
  const loadBEQGraphData = async () => {
    try {
      const response = await axios.get('/Dashboard/GraphicalBEQException/');
      setBEQGraphData(response.data);
    } catch (error) {
      console.error('Error fetching BEQ graph data:', error);
    }
  };
  const loadTEQGraphData = async () => {
    try {
      const response = await axios.get('/Dashboard/GraphicalTEQException/');
      setTEQGraphData(response.data);
    } catch (error) {
      console.error('Error fetching TEQ graph data:', error);
    }
  };
  return (
    <div>
      <div className="ps-dashboard-header">
        <br /><br />
        {/* BEQ Summary List */}
        <div className="col-md-6">
          <div className="widget widget-nopad">
            <div className="widget-header">
              <i className="fa fa-exclamation-triangle" style={{ marginLeft: '0.5em' }}></i>
              <h3 style={{ margin: '0px' }}> Business Exception Queue</h3>
            </div>
            <div className="dashboard-widget-content" style={{ overflowY: 'auto' }}>
              {!BEQSummaryList && (
                <div>
                  <i className="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <div className="shortcuts">
                {BEQSummaryList && BEQSummaryList.map((Exception, index) => (
                  <a 
                    href={`#/businessexception/${Exception.ExceptionName}`}
                    key={index}
                    className={Exception.NoOfExceptions >= Exception.ThreshholdCount ? 'shortcut shortcut-danger' : 'shortcut shortcut-info'}
                  >
                    <span className={Exception.NoOfExceptions >= Exception.ThreshholdCount ? 'shortcut-header' : 'shortcut-headerSuccess'}>
                      {Exception.ExceptionName}
                    </span>
                    <span className="value">{Exception.NoOfExceptions}</span><br />
                    <span className="value">{Exception.DateTime}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* TEQ Summary List */}
        <div className="col-md-6">
          <div className="widget widget-nopad">
            <div className="widget-header">
              <i className="fa fa-exclamation-triangle" style={{ marginLeft: '0.5em' }}></i>
              <h3 style={{ margin: '0px' }}>Technical Exception Queue</h3>
            </div>
            <div className="dashboard-widget-content" style={{ overflowY: 'auto' }}>
              {!TEQSummaryList && (
                <div>
                  <i className="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <div className="shortcuts">
                {TEQSummaryList && TEQSummaryList.map((Exception, index) => (
                  <a
                    href={`#/Exceptions/${Exception.ExceptionName}`}
                    key={index}
                    className={Exception.NoOfExceptions >= Exception.ThreshholdCount ? 'shortcut shortcut-danger' : 'shortcut shortcut-info'}
                  >
                    <span className={Exception.NoOfExceptions >= Exception.ThreshholdCount ? 'shortcut-header' : 'shortcut-headerSuccess'}>
                      {Exception.ExceptionName}
                    </span>
                    <span className="value">{Exception.NoOfExceptions}</span><br />
                    <span className="value">{Exception.DateTime}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;