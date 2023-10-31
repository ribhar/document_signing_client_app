import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &::after {
    content: '...';
    display: block;
    width: 30px;
    height: 16px;
    text-align: center;
    line-height: 15px;
    font-size: 30px;
    color: #fff;
    animation: loader 1.5s steps(3, end) infinite;
  }

  @keyframes loader {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;


const Loader = () => {
  return <LoaderContainer />;
};

export default Loader;
