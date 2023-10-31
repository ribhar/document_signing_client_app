import React, { useContext, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import styled from "styled-components";
import { getAuthToken } from "../utils/verifySessionToken";
import { ToastContext } from "../App";
import { SignatureLabel } from "../utils/styles";
import Loader from './Loader';

const StyledSignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { handleShowToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const clear = () => {
    sigCanvas.current.clear();
  };

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

  const signDocument = () => {
    const authToken = getAuthToken();
    
  
    try {
      setIsLoading(true)
      if (sigCanvas.current.isEmpty()) {
        handleShowToast("Please provide a signature first.", "failure");
      } else {
        const canvasData = sigCanvas.current
          .getTrimmedCanvas()
          .toDataURL("image/png");
  
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("signature", dataURItoBlob(canvasData));
        // formData.append('pdfId', pdfId);
  
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
          }).finally(()=>setIsLoading(false));
      }
    } catch (error) {
      console.error("Synchronous error:", error);
    } 
  };
  

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  return (
    <StyledSignatureContainer>
      <SignatureLabel>
        Please draw your signature in the box below:
      </SignatureLabel>
      <SignatureCanvasContainer>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
            style: {
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
          ref={sigCanvas}
        />
      </SignatureCanvasContainer>
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
      <ActionContainer>
        <ActionButton onClick={clear}>Clear</ActionButton>
        <ActionButton onClick={signDocument} disabled={isLoading}>
          {isLoading ? <Loader /> : 'Sign'}
        </ActionButton>
      </ActionContainer>
      {/* Download button */}
      {downloadUrl && (
        <DownloadButton onClick={handleDownload}>Download PDF</DownloadButton>
      )}
    </StyledSignatureContainer>
  );
};

export default SignatureCapture;
