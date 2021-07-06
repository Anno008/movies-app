import { ApiConfig } from "api/apiCall";
import { moviesDataFixture } from "testUtils/fixtures/moviesDataFixture";

import { fetchUpcomingMovies } from "../movieService";

const mockGetJson = jest.fn();
jest.mock("../../apiCall.ts", () => ({
  getJSON: (config: ApiConfig) => mockGetJson(config)
}));

describe("movieService tests", () => {
  it("Should return movies data response", async () => {
    mockGetJson.mockImplementation(() => Promise.resolve(moviesDataFixture));

    const response = await fetchUpcomingMovies(1);

    expect(response).toStrictEqual(moviesDataFixture);
    expect(mockGetJson).toHaveBeenCalledWith({
      url: "movie/upcoming?page=1"
    });
  });
});
