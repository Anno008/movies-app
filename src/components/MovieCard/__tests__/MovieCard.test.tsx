import { act, waitFor } from "@testing-library/react-native";
import React from "react";

import { movieFixture1 } from "testUtils/fixtures/movieFixture";

import locators from "testUtils/locators";

import { renderWithContext } from "testUtils/renderWithContext";

import MovieCard from "../MovieCard";

describe("MovieCard tests", () => {
  it("Should display title, image and rating", async () => {
    const { findByTestId, getByText } = renderWithContext(
      <MovieCard {...movieFixture1} />
    );

    const image = await findByTestId(locators.movieCardImage);
    const title = getByText(movieFixture1.title);
    const rating = getByText(`Rating: ${movieFixture1.vote_average} / 10`);

    expect(title).toBeDefined();
    expect(rating).toBeDefined();
    expect(image).toBeDefined();
  });
});
