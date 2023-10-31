// SignedDocumentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Title,
  DocumentLabel,
  DocumentLabelContainer,
  DocumentLink,
  DocumentValue,
  DocumentItem,
  DocumentListContainer,
} from "../utils/styles";
import Loader from './Loader';

const SignedDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doc/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setDocuments(response.data);
        setIsLoading(true); 
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  if (!isLoading) {
    return <Loader />;
  }

  return (
    <DocumentListContainer>
      <Title>Signed Documents</Title>
      {documents.length > 0 ? (
        documents.map((document) => (
          <DocumentItem key={document._id}>
            <DocumentLabelContainer>
              <DocumentLabel>Document Name:</DocumentLabel> {/* Updated label to 'Document Name' */}
              <DocumentValue>{document.docName}</DocumentValue> {/* Added 'docName' field */}
            </DocumentLabelContainer>
            <DocumentLabelContainer>
              <DocumentLabel>Signatory Name:</DocumentLabel>
              <DocumentValue>{document.name}</DocumentValue>
            </DocumentLabelContainer>
            <DocumentLabelContainer>
              <DocumentLabel>Signatory Email:</DocumentLabel>
              <DocumentValue>{document.email}</DocumentValue>
            </DocumentLabelContainer>
            <DocumentLink
              href={document.signedDocUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
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

