import styled from "styled-components/native";

export const FloatingButton = styled.TouchableOpacity`
  opacity: 0.7;
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
  border-radius: 25px;
  justify-content: center;
  right: 15px;
  bottom: 15px;
`;
