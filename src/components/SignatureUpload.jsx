import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { getAuthToken } from "../utils/verifySessionToken";
import {
  SignatureLabel,
  FileInput,
  UploadButton,
  DownloadButton,
} from "../utils/styles";
import { ToastContext } from "../App";
import Loader from './Loader';

const SignatureUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 0 40px;
  border-radius: 5px;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  width: 94%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SignatureUpload = ({ pdfId }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { handleShowToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "signed_document.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      handleShowToast("No file to download.", "failure");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
    } else {
      handleShowToast("Please upload a PNG file.", "failure");
    }
  };

  const handleUpload = async () => {
    try {
        setIsLoading(true)
      const authToken = getAuthToken();

      if (!file) {
        handleShowToast("Please upload a signature file.", "failure");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("signature", file);

      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/doc/sign/${pdfId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: "blob",
          }
        )
        .then((response) => {
          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const url = window.URL.createObjectURL(pdfBlob);
          setDownloadUrl(url);
          handleShowToast("Document signed successfully.", "success");
        })
        .catch((error) => {
          console.error("Error signing document:", error);
          handleShowToast("Error signing document.", "failure");
        }).finally(()=> setIsLoading(false));
    } catch (error) {
      console.error("Error signing document:", error);
      handleShowToast("Error signing document.", "failure");
    }
  };

  return (
    <SignatureUploadContainer>
      <SignatureLabel>
        Please upload your signature in the box below:
      </SignatureLabel>
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
      <UploadButton onClick={handleUpload} disabled={isLoading}>{isLoading ? <Loader /> : 'Sign'}</UploadButton>
      {/* Download button */}
      {downloadUrl && (
        <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
      )}
    </SignatureUploadContainer>
  );
};

export default SignatureUpload;
