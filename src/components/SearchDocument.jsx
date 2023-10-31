import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { getAuthToken } from "../utils/verifySessionToken";
import {
  DocumentCard,
  DocumentItem,
  DocumentLabel,
  DocumentLabelContainer,
  DocumentLink,
  DocumentValue,
} from "../utils/styles";
import { ToastContext } from "../App";
import Loader from './Loader';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 0 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #e6e6fa, #d8bfd8);
  width: 100%;
`;

const SearchInputButtonContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  align-self: center;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #4a148c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
`;

const SearchDocument = () => {
  const [searchValue, setSearchValue] = useState("");
  const [documents, setDocuments] = useState([]);
  const { handleShowToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const authToken = getAuthToken();
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doc/search?search=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setDocuments(response.data);
        }
      })
      .catch((error) => {
        handleShowToast("Error fetching document", "failure");
        console.error("Error fetching document:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SearchContainer>
      <SearchInputButtonContainer>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search by document name"
        />
        <SearchButton onClick={handleSearchClick}>Search</SearchButton>
      </SearchInputButtonContainer>
      {documents.map((document) => (
        <DocumentItem key={document._id}>
          <DocumentLabelContainer>
            <DocumentLabel>Document Name</DocumentLabel>
            <DocumentValue>{document.docName}</DocumentValue>
          </DocumentLabelContainer>
          <DocumentLabelContainer>
            <DocumentLabel>Signatory Name</DocumentLabel>
            <DocumentValue>{document.name}</DocumentValue>
          </DocumentLabelContainer>
          <DocumentLabelContainer>
            <DocumentLabel>Signatory Email</DocumentLabel>
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
      ))}
    </SearchContainer>
  );
};

export default SearchDocument;


