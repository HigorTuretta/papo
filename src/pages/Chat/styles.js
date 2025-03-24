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
