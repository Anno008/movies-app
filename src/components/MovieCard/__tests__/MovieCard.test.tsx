import { fireEvent } from "@testing-library/react-native";
import React from "react";

import { movieFixture1 } from "testUtils/fixtures/movieFixture";
import locators from "testUtils/locators";
import { renderWithContext } from "testUtils/renderWithContext";

import MovieCard from "../MovieCard";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}));

describe("MovieCard tests", () => {
  it("Should display title, image and release date", async () => {
    const { findByTestId, getByText } = renderWithContext(
      <MovieCard {...movieFixture1} />
    );

    const image = await findByTestId(locators.movieCardImage);
    const title = getByText(movieFixture1.title);
    const rating = getByText(`${movieFixture1.release_date}`);

    expect(title).toBeDefined();
    expect(rating).toBeDefined();
    expect(image).toBeDefined();
  });

  it("Should navigate to MovieDetails on press", async () => {
    const { findByTestId } = renderWithContext(
      <MovieCard {...movieFixture1} />
    );

    const navigateButton = await findByTestId(
      `${locators.movieCardContainer}-${movieFixture1.id}`
    );

    fireEvent.press(navigateButton);

    expect(mockedNavigate).toHaveBeenCalledWith("MovieDetails", {
      id: movieFixture1.id
    });
  });
});
