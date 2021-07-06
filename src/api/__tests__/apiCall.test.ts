import { getJSON } from "api/apiCall";
import { apiKey, apiUrl } from "constants/config";

describe("ApiCall tests", () => {
  it("Should return json object when calling getJSON", async () => {
    const jsonMock = {
      value: "test",
      id: 1
    };

    const url = "test";
    const fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ...fetch.prototype,
        json: () => Promise.resolve(jsonMock),
        status: 200
      })
    );
    const response = await getJSON({
      url
    });

    expect(response).toEqual(jsonMock);
    expect(fetchSpy).toHaveBeenCalledWith(
      `${apiUrl}/${url}&api_key=${apiKey}`,
      {
        body: undefined,
        headers: {
          "Content-Type": "application/json",
          api_key: apiKey
        },
        method: "GET"
      }
    );
  });
});
