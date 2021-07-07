interface TestProps {
  testID: string;
  accessibilityLabel: string;
}

export const setTestId = (id: string): TestProps | undefined => {
  if (process.env.TEST) {
    return {
      testID: id,
      accessibilityLabel: id
    };
  }
};
