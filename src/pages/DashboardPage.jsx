import React, { useContext, useEffect, useState } from "react";
import DocumentUploadForm from "../components/DocumentUploadForm";
import SignedDocumentList from "../components/SignedDocumentList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/verifySessionToken";
import SearchDocument from "../components/SearchDocument";
import { ToastContext } from "../App";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  width: 500px;
`;

const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #4a148c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");
  const { handleShowToast } = useContext(ToastContext);

  useEffect(() => {
    const tokenValidationResult = isTokenValid();
    if (!tokenValidationResult.isTokenValid) {
      if (tokenValidationResult.isSession) {
        handleShowToast("Session has expired. Please log in again.", "failure");
        // alert('Session has expired. Please log in again.');
      }
      navigate("/login");
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <DashboardContainer>
      {/* <Title>Dashboard</Title> */}
      <TabContainer>
        <TabButton
          onClick={() => handleTabClick("upload")}
          style={{
            backgroundColor: activeTab === "upload" ? "#6a1b9a" : "#4a148c",
          }}
        >
          Upload Document
        </TabButton>
        <TabButton
          onClick={() => handleTabClick("list")}
          style={{
            backgroundColor: activeTab === "list" ? "#6a1b9a" : "#4a148c",
          }}
        >
          Signed Document List
        </TabButton>
        <TabButton
          onClick={() => handleTabClick("search")}
          style={{
            backgroundColor: activeTab === "search" ? "#6a1b9a" : "#4a148c",
          }}
        >
          Search Document
        </TabButton>
      </TabContainer>
      {activeTab === "upload" && <DocumentUploadForm />}
      {activeTab === "list" && <SignedDocumentList />}
      {activeTab === "search" && <SearchDocument />}
    </DashboardContainer>
  );
};

export default DashboardPage;
