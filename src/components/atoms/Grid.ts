import styled from "styled-components/native";

interface Props {
  margin?: number;
  padding?: number;
  paddingHorizontal?: number;
  flexDirection?: "column" | "row";
  backgroundColor?: string;
  alignItems?: string;
  justifyContent?: string;
  flexStretch?: string;
  border?: string;
  borderRadius?: string;
  overflow?: string;
  elWidth?: string;
}

export const Grid = styled.View<Props>`
  ${({ flexStretch }) => flexStretch && `flex: ${flexStretch};`}
  ${({ margin }) => margin && `margin: ${margin}px;`}
  ${({ elWidth }) => elWidth && `width: ${elWidth};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ border }) => border && `border: ${border};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ padding }) => padding && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) =>
    paddingHorizontal && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ backgroundColor, theme }) =>
    `background-color: ${
      backgroundColor ? backgroundColor : theme.primaryBackgroundColor
    };`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`;
