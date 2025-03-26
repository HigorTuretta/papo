import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

export const HelloArea = styled.div`
  display: flex;
  justify-content:center;
  align-itens: center;
  flex: 1;
  flex-direction:column;
`
