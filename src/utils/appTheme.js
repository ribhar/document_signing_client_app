import styled from "styled-components";
export const theme = {
    primaryColor: '#7E57C2',
    secondaryColor: '#9575CD',
    textColor: '#fff',
};

export const FileInput = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 94%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const UploadButton = styled.button`
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

export const SignatureLabel = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const DownloadButton = styled.button`
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