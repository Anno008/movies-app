import styled from "styled-components/native";

interface Props {
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  border?: string;
  borderRadius?: string;
  overflow?: string;
}

export const TouchableOpacity = styled.TouchableOpacity<Props>`
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ margin }) => margin && `margin: ${margin}px;`}
  ${({ marginVertical }) =>
    marginVertical && `margin-vertical: ${marginVertical}px;`}
    ${({ marginHorizontal }) =>
    marginHorizontal && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ border }) => border && `border: ${border};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
`;
