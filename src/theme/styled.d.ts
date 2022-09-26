import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryTextColor: string;
    primaryBackgroundColor: string;
    secondaryBackgroundColor: string;
    textShadow: string;
    headerBackgroundColor: string;
  }

  declare interface StyledFlatList {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FlatList<T>(styles: any): new () => ReactNative.FlatList<T>;
  }

  declare const styled: ReactNativeStyledInterface<DefaultTheme> &
    StyledFlatList;
}
