import { FC, PropsWithChildren } from "react";
import { ImageBackgroundProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ImageBackgroundProps {
  elWidth?: string;
  height?: number;
  alignItems?: string;
  justifyContent?: string;
}

export const ImageBackground: FC<
  PropsWithChildren<Props>
> = styled.ImageBackground<Props>`
  ${({ elWidth }) => elWidth && `width: ${elWidth};`}
  ${({ height }) => height && `height: ${height}px;`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`;
