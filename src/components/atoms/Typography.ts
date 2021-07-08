import styled from "styled-components/native";

interface Props {
  bold?: boolean;
  fontSize?: string;
  color?: string;
  textShadow?: boolean;
  alignSelf?: string;
}

export const Typography = styled.Text<Props>`
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ bold }) => bold && "font-weight: bold;"}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ color, theme }) => `color: ${color ? color : theme.primaryTextColor};`}
`;
