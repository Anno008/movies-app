import React from "react";

import { render } from "@testing-library/react-native";

import App from "../App";

describe("App tests", () => {
  it("Should display movies screen on app boot", () => {
    const renderResult = render(<App />);
    const title = renderResult.getByText("Movies Screen");
    expect(title).toBeDefined();
  });
});
