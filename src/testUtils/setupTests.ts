jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Global fetch mock as to prevent real fetch calls during test runs
// for individual test cases where we want to assert the behavior depending
// on the response data it is necessary to manually mock fetch per test unit
// Example:
// const fetchMock = jest
//    .spyOn(global, "fetch")
//    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve("What we want to receive") }));

// const result = await functionThatCallsFetch();
// expect(fetchMock).toHaveBeenCalledWith("url");

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      ...global.fetch.prototype,
      body: false,
      status: 200,
      json: () => Promise.resolve(),
      arrayBuffer: () => Promise.resolve()
    });
});
