import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
// Assuming a hypothetical external component that needs to be imported.
// If real components are to replace these placeholders, ensure correct import paths.
// import SomeChildComponent from './SomeChildComponent';
type MessageDetailsType = {
  // Types for the message details object
  ParentMessageLogId: number;
  ExceptionDescription: string;
type DocumentContentType = {
  // Types for document content
  Content: string;
  HeaderValue: string;
type ExceptionContentType = {
  // Types define the structure of the exception content received
  ExceptionDescription: string;
interface IMessageLogModuleProps {
  Serviceid: string;
// React Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
const MessageLogModule: React.FC<IMessageLogModuleProps> = ({ Serviceid }) => {
  const [messageDetails, setMessageDetails] = useState<MessageDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [documentContent, setDocumentContent] = useState<DocumentContentType | null>(null);
  const [exceptionContent, setExceptionContent] = useState<ExceptionContentType | null>(null);
  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(`ReportingController/GetMessageDetails/${Serviceid}`);
        setMessageDetails(response.data);
        setLoading(false);
        console.error('There was an error fetching the message details:', error);
        setLoading(false);
    fetchMessageDetails();
  const openModal = (type: 'document' | 'exception', content: any) => {
    if (type === 'document') {
      setDocumentContent(content);
      setExceptionContent(content);
    setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  const fetchDocumentContent = async (Documentobjectid: string) => {
    try {
      const response = await axios.get(`ExceptionController/GetMessageContent/${Documentobjectid}`);
      setDocumentContent({ Content: response.data, HeaderValue: '' }); // Assuming HeaderValue is to be set here
    } catch (error) {
      console.error('Error fetching document content:', error);
  const searchdet = (messageLogs: MessageDetailsType[]) => {
    return messageLogs.filter((messageLog) => messageLog.ParentMessageLogId === 0 || messageLog.ExceptionDescription !== '');
  // Placeholder for scrolling functionality
  const scrollTo = (eID: string) => {
    const est = document.getElementById(eID);
    if (est) {
      est.scrollIntoView();
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
        <div>
          {searchdet(messageDetails).map((detail, index) => (
            <div key={index}>
              {/* Placeholder for child components displaying message details */}
            </div>
          {/* React modal for document content */}
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <button onClick={closeModal}>Close</button>
            {documentContent && <div>{documentContent.Content}</div>}
            {exceptionContent && <div>{exceptionContent.ExceptionDescription}</div>}
          </Modal>
        </div>
    </div>
export default MessageLogModule;