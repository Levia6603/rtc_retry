import styled from "styled-components";

export const Wrapper = styled.section`
  overflow: hidden;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const EnterPage = styled.div`
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

export const CallPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  padding: 40px;
  background-color: #000;
`;

export const LocalUser = styled.video`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px #fff;
  }
`;
export const RemoteUser = styled.video`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px #fff;
  }
`;

export const Label = styled.p`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`;
