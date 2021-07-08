import { ApiConfig } from "api/apiCall";
import { genreDataFixture } from "testUtils/fixtures/genreFixture";

import { fetchGenres } from "../genresService";

const mockGetJson = jest.fn();
jest.mock("../../apiCall.ts", () => ({
  getJSON: (config: ApiConfig) => mockGetJson(config)
}));

describe("genresService tests", () => {
  beforeEach(() => {
    mockGetJson.mockClear();
  });
  it("Should return genres data response", async () => {
    mockGetJson.mockImplementation(() => Promise.resolve(genreDataFixture));

    const response = await fetchGenres();

    expect(response).toStrictEqual(genreDataFixture);
    expect(mockGetJson).toHaveBeenCalledWith({
      url: "genre/movie/list?"
    });
  });
});
