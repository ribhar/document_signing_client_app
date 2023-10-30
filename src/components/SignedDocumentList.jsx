// SignedDocumentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../utils/appTheme';

const DocumentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-top: 20px;
  padding: 0 58px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #e6e6fa, #d8bfd8);
  margin: 20px;
  width: 100%;
`;


const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;

const DocumentLabelContainer = styled.div`
  margin-bottom: 5px;
`;

const DocumentLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin
  display: inline;
`;

const DocumentValue = styled.span`
  margin-left: 5px;
  display: inline;
`;

const DocumentItem = styled.div`
//   border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #fff ;
  width: 400px;
`;

const DocumentLink = styled.a`
  background-color: ${theme.secondaryColor};
  color: ${theme.textColor};
  padding: 10px;
  width: 80%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  display: block;

  &:hover {
    background-color: #7E57C2;
    transform: scale(1.05);
  }
`;


const SignedDocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      const authToken = JSON.parse(localStorage.getItem('token'));
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/doc/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setDocuments(response.data);
          setIsLoaded(true); // Set isLoaded to true on successful API call
        })
        .catch((error) => {
          console.error('Error fetching documents:', error);
        });
    }, []);
  
    if (!isLoaded) {
      return <DocumentListContainer>Loading...</DocumentListContainer>; // Display a loading message or spinner while fetching data
    }
  
    return (
      <DocumentListContainer>
        <Title>Signed Documents</Title>
        {documents.length > 0 ? (
          documents.map((document) => (
            <DocumentItem key={document._id}>
  
            <DocumentLabelContainer>
                <DocumentLabel>Signatory Name:</DocumentLabel>
                <DocumentValue>{document.name}</DocumentValue>
            </DocumentLabelContainer>
            <DocumentLabelContainer>
                <DocumentLabel>Signatory Email:</DocumentLabel>
                <DocumentValue>{document.email}</DocumentValue>
            </DocumentLabelContainer>
            <DocumentLink href={document.signedDocUrl} target="_blank" rel="noopener noreferrer">
                Open Document
            </DocumentLink>
          </DocumentItem>
        ))
      ) : (
        <div>No documents available</div>
      )}
    </DocumentListContainer>
  );
};

export default SignedDocumentList;