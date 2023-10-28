import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SignatureCapture from './SignatureCapture';
import { getAuthToken } from '../utils/verifySessionToken';

const theme = {
  primaryColor: '#7E57C2',
  secondaryColor: '#9575CD',
  textColor: '#fff',
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 0 40px;
  // border: 1px solid ${theme.primaryColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #e6e6fa, #d8bfd8);
  width: 100%;
`;

const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
`;

const UploadButton = styled.button`
  background-color: ${theme.secondaryColor};
  color: ${theme.textColor};
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added box-shadow */
  margin-bottom: 20px; /* Added margin-bottom */

  &:hover {
    background-color: #7E57C2;
    transform: scale(1.05);
  }
`;

const DocumentUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pdfId, setpdfId] = useState(''); // New state to store the PDF URL
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const authToken = getAuthToken();
      
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/doc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      setFile(null);
      setUploadSuccess(true);
      setpdfId(response.data._id); 

      alert('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document. Please try again.');
    }
  };

  return (
    <FormContainer>
      <Title>Upload Document</Title>
      <FileInput type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
      {uploadSuccess && pdfId && <SignatureCapture pdfId={pdfId}/>}
    </FormContainer>
  );
};

export default DocumentUploadForm;
