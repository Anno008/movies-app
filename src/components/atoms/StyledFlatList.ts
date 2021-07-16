import styled from "styled-components/native";
import { FlatList } from "react-native";

export const StyledFlatList = styled.FlatList`
  ${({ theme }) => `background-color: ${theme.primaryBackgroundColor};`}
  padding-horizontal: 10px;
` as React.ComponentType as new <T>() => FlatList<T>;
