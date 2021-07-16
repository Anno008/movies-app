import styled from "styled-components/native";

interface Props {
  elWidth?: string;
  height?: number;
  alignItems?: string;
  justifyContent?: string;
}

export const ImageBackground = styled.ImageBackground<Props>`
  ${({ elWidth }) => elWidth && `width: ${elWidth};`}
  ${({ height }) => height && `height: ${height}px;`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`;
