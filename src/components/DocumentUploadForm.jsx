import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { getAuthToken } from "../utils/verifySessionToken";
import { ToastContext } from "../App";
import SignatureUpload from "./SignatureUpload";
import SignatureCapture from "./SignatureCapture";
import { Title, UploadButton, FileInput } from "../utils/styles";
import Loader from './Loader';

const FormContainer = styled.div`
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

const ToggleButton = styled.button`
  background-color: #9575cd;
  color: #fff;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;

  &:hover {
    background-color: #7e57c2;
    transform: scale(1.05);
  }
`;

const DocumentUploadForm = () => {
  const [isCaptureMode, setIsCaptureMode] = useState(true);
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pdfId, setpdfId] = useState("");
  const { handleShowToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true)
      const authToken = getAuthToken();

      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/doc/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setFile(null);
      setUploadSuccess(true);
      setpdfId(response.data._id);

      handleShowToast("Document uploaded successfully", "success");
    } catch (error) {
      console.error("Error uploading document:", error);
      handleShowToast("Error uploading document.", "failure");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <FormContainer>
      <Title>Upload Document</Title>
      <FileInput type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleUpload}  disabled={isLoading}>
        {isLoading ? <Loader /> : 'Upload'}
      </UploadButton>
      {uploadSuccess && (
        <>
          <ToggleButton onClick={() => setIsCaptureMode(!isCaptureMode)}>
            {isCaptureMode
              ? "Upload Signature instead?"
              : "Capture Signature instead?"}
          </ToggleButton>
          {isCaptureMode ? (
            <SignatureCapture pdfId={pdfId} />
          ) : (
            <SignatureUpload pdfId={pdfId} />
          )}
        </>
      )}
    </FormContainer>
  );
};

export default DocumentUploadForm;
