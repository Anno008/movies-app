import React from "react";
import { render } from "@testing-library/react-native";

import locators from "testUtils/locators";

import App from "../App";

describe("App tests", () => {
  it("Should display movies screen on app boot", async () => {
    const renderResult = render(<App />);

    const list = await renderResult.findByTestId(locators.moviesScreenList);
    expect(list).toBeDefined();
  });
});
