import styled from "styled-components";

export const theme = {
    primaryColor: '#7E57C2',
    secondaryColor: '#9575CD',
    textColor: '#fff',
};

export const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;


export const FileInput = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  background-color: #9575CD;
  color: #fff;
  margin: 10px 0;
  padding: 15px;
  width: 110%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #7E57C2;
    transform: scale(1.05);
  }
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

export const UploadButton2 = styled.button`
  background-color: ${theme.secondaryColor};
  color: ${theme.textColor};
  padding: 15px;
  width: 106%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added box-shadow */
  margin-top: 10px; /* Added margin-top */
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


export const DocumentCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #fff;
  width: 400px;
`;

export const DocumentLabelContainer = styled.div`
  margin-bottom: 5px;
`;

export const DocumentLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
  display: inline;
`;

export const DocumentValue = styled.span`
  margin-left: 5px;
  display: inline;
`;

export const DocumentLink = styled.a`
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


export const DocumentListContainer = styled.div`
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

export const DocumentItem = styled.div`
//   border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #fff ;
  width: 400px;
`;