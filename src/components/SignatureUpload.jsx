import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getAuthToken } from '../utils/verifySessionToken';
import { SignatureLabel, FileInput, Input, UploadButton, DownloadButton } from '../utils/appTheme';
import { ToastContext } from '../App';

const SignatureUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 0 40px;
  border-radius: 5px;
  width: 100%;
`;

const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;
const SignatureUpload = ({ pdfId }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [downloadUrl, setDownloadUrl] = useState(null);
    const { handleShowToast } = useContext(ToastContext);
  
    const handleDownload = () => {
      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'signed_document.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        handleShowToast('No file to download.', 'failure');
      }
    };
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile && selectedFile.type === 'image/png') {
        setFile(selectedFile);
      } else {
        handleShowToast('Please upload a PNG file.', 'failure');
      }
    };
  
    const handleUpload = async () => {
      try {
        const authToken = getAuthToken();
  
        if (!file) {
          handleShowToast('Please upload a signature file.', 'failure');
          return;
        }
  
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('signature', file);

        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/doc/sign/${pdfId}`, formData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: 'blob',
          })
          .then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(pdfBlob);
            setDownloadUrl(url);
            handleShowToast('Document signed successfully.', 'success');
          })
          .catch((error) => {
            console.error('Error signing document:', error);
            handleShowToast('Error signing document.', 'failure');
          });
      } catch (error) {
        console.error('Error signing document:', error);
        handleShowToast('Error signing document.', 'failure');
      }
    };
  
    return (
      <SignatureUploadContainer>
        <SignatureLabel>Please upload your signature in the box below:</SignatureLabel>
        <FileInput type="file" onChange={handleFileChange} />
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <UploadButton onClick={handleUpload}>Sign</UploadButton>
        {/* Download button */}
        {downloadUrl && (
          <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
        )}
      </SignatureUploadContainer>
    );
  };
  
  export default SignatureUpload;
