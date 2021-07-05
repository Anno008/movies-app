import React from "react";

import { render } from "@testing-library/react-native";

import App from "../App";

describe("App tests", () => {
  it("Should render", () => {
    const renderResult = render(<App />);
    const title = renderResult.getByText("Movies App");
    expect(title).toBeDefined();
  });
});
