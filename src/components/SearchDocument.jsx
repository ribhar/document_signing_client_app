import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getAuthToken } from '../utils/verifySessionToken';
import { theme } from '../utils/appTheme';
import { ToastContext } from '../App';

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

const DocumentCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #fff;
  width: 400px;
`;

const DocumentLabelContainer = styled.div`
  margin-bottom: 5px;
`;

const DocumentLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
  display: inline;
`;

const DocumentValue = styled.span`
  margin-left: 5px;
  display: inline;
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

const SearchDocument = () => {
  const [searchValue, setSearchValue] = useState('');
  const [document, setDocument] = useState(null);
  const { handleShowToast } = useContext(ToastContext);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const authToken = getAuthToken()
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doc/${searchValue}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setDocument(response.data);
        }
      })
      .catch((error) => {
        handleShowToast('Error fetching document','failure')
        console.error('Error fetching document:', error);
      });
  };

  return (
    <SearchContainer>
      <SearchInputButtonContainer>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search by document ID"
        />
        <SearchButton onClick={handleSearchClick}>Search</SearchButton>
      </SearchInputButtonContainer>
      {document && (
        <DocumentCard>
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
        </DocumentCard>
      )}
    </SearchContainer>
  );
};

export default SearchDocument;
