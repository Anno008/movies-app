import { moviesDataFixture } from "testUtils/fixtures/moviesDataFixture";
import { mergeMovieData } from "utils/mergeMovieData";

describe("MergeMovieData tests", () => {
  it("Should combine movies data", () => {
    const result = mergeMovieData(moviesDataFixture, moviesDataFixture.results);

    expect(result.results).toStrictEqual([
      ...moviesDataFixture.results,
      ...moviesDataFixture.results
    ]);
  });

  it("Should return only new data if previous data is undefined", () => {
    const result = mergeMovieData(moviesDataFixture, undefined);
    expect(result.results).toStrictEqual(moviesDataFixture.results);
  });

  it("Should return only new data if previous data results is undefined", () => {
    const result = mergeMovieData(moviesDataFixture, []);
    expect(result.results).toStrictEqual(moviesDataFixture.results);
  });
});
