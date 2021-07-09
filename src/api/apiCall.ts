import { apiKey, apiUrl } from "constants/config";

export interface FetchConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit_;
}

export const getJSON = <T>(config: FetchConfig): Promise<T> =>
  fetch(`${apiUrl}/${config.url}&api_key=${apiKey}`, {
    body: config.body,
    headers: createHeader(),
    method: config.method || "GET"
  }).then(response => response.json());

const createHeader = (): HeadersInit_ => ({
  "Content-Type": "application/json",
  api_key: apiKey
});
