interface TestProps {
  testID: string;
  accessibilityLabel: string;
}

export const setTestId = (id: string): TestProps | undefined => {
  if (process.env.TESTS) {
    return {
      testID: id,
      accessibilityLabel: id
    };
  }
};
