import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import styled from 'styled-components';
import { getAuthToken } from '../utils/verifySessionToken';

const StyledSignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SignatureCanvasLabel = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

const SignatureCanvasContainer = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 94%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px; 
  width: 100%;
`;

const ActionButton = styled.button`
  flex: 1;
//   margin: 10px;
  padding: 15px;
  background-color: #9575cd;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #7e57c2;
    transform: scale(1.05);
  }
`;

const DownloadButton = styled.button`
  flex: 1;
  margin: 10px;
  padding: 15px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2e7d32;
    transform: scale(1.05);
  }
`;

const SignatureCapture = ({ pdfId }) => {
    const sigCanvas = useRef({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [downloadUrl, setDownloadUrl] = useState(null);
  
    const clear = () => {
      sigCanvas.current.clear();
    };
  
    const handleDownload = () => {
      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'signed_document.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No file to download.');
      }
    };
  
    const signDocument = () => {
      const authToken = getAuthToken()
  
      if (sigCanvas.current.isEmpty()) {
        alert('Please provide a signature first.');
      } else {
        const canvasData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        const requestData = {
          name,
          email,
          signature: canvasData,
          pdfId,
        };
  
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/doc/sign`, requestData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            responseType: 'blob', // Set the response type to blob
          })
          .then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(pdfBlob);
            setDownloadUrl(url); // Set the download URL in state
            alert('Document signed successfully.');
          })
          .catch((error) => {
            console.error('Error signing document:', error);
            alert('Error signing document. Please try again.');
          });
      }
    };
  
  
  return (
    <StyledSignatureContainer>
      <SignatureCanvasLabel>Please draw your signature in the box below:</SignatureCanvasLabel>
      <SignatureCanvasContainer>
        <SignatureCanvas
            penColor="black"
            canvasProps={{
            width: 500,
            height: 200,
            className: 'sigCanvas',
            style: { background: 'rgba(255, 255, 255, 0.7)', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
            }}
            ref={sigCanvas}
        />
      </SignatureCanvasContainer>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <ActionContainer>
        <ActionButton onClick={clear}>Clear</ActionButton>
        <ActionButton onClick={signDocument}>Sign</ActionButton>
      </ActionContainer>
      {/* Download button */}
      {downloadUrl && (
        <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
      )}
    </StyledSignatureContainer>
  );
};

export default SignatureCapture;
