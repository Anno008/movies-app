import styled from "styled-components/native";

interface Props {
  margin?: number;
  marginVertical?: number;
  borderRadius?: string;
  border?: string;
}

export const TextInput = styled.TextInput<Props>`
  padding-horizontal: 10px;
  ${({ margin }) => margin && `margin: ${margin}px;`}
  ${({ marginVertical }) =>
    marginVertical && `margin-vertical: ${marginVertical}px;`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ theme }) =>
    `border: 1px solid ${theme.secondaryBackgroundColor || "#131414"};`}
  ${({ theme }) => `color: ${theme.primaryTextColor};`}
`;
