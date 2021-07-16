import styled from "styled-components/native";

interface Props {
  bold?: boolean;
  fontSize?: string;
  color?: string;
  textShadow?: boolean;
  alignSelf?: string;
  applyTextShadow?: boolean;
}

export const Typography = styled.Text<Props>`
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ bold }) => bold && "font-weight: bold;"}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ color, theme }) => `color: ${color ? color : theme.primaryTextColor};`}
  ${({ applyTextShadow, theme }) =>
    applyTextShadow &&
    `
      text-shadow: 0px 0px ${theme.textShadow || "#131414"};
      text-shadow-radius: 8px;
  `}
`;
