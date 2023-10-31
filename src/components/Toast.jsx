import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../utils/styles";

const popUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  text-align: center;
  width: 275px;
  position: fixed;
  top: 3%;
  left: 39.9%;
  background: ${({ type }) => (type === "success" ? "#00BB00" : "#E00000")};
  color: #fff;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  animation: ${({ show }) => (show ? popUp : slideUp)} 0.5s;
`;

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer show={visible} type={type}>
      {message.message}
    </ToastContainer>
  );
};

export default Toast;
