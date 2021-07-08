import styled from "styled-components/native";

interface Props {
  flexStretch?: string;
}
export const ScrollView = styled.ScrollView<Props>`
  ${({ flexStretch }) => flexStretch && `flex: ${flexStretch};`}
  height: 100%;
  ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
`;
