import styled from "styled-components/native";

interface Props {
  margin?: number;
  border?: string;
  borderRadius?: string;
  overflow?: string;
}

export const TouchableOpacity = styled.TouchableOpacity<Props>`
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ margin }) => margin && `margin: ${margin}px;`}
  ${({ border }) => border && `border: ${border};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
`;
