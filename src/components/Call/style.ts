import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 1000px;
  height: 600px;
  border: 2px solid #000;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 10px 10px 0px #000;
  h2 {
    font-size: 36px;
    font-weight: 800;
  }
  input {
    font-size: 16px;
    margin-right: 8px;
    padding: 8px 16px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
  }
  button {
    padding: 8px 16px;
    border: 1px solid #000;
    border-radius: 8px;
    color: #fff;
    background-color: #000;
    font-size: 16px;
    &:hover {
      color: #000;
      background-color: transparent;
    }
    &:active {
      color: #fff;
      background-color: #000;
    }
  }
`;
