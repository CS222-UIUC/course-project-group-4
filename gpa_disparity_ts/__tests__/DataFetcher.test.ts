import DataFetcher from "../src/network/DataFetcher";

test("data fetcher does something", async () => {
  const datafetcher = new DataFetcher();
  const response = await datafetcher.fetchGpaInformation();
  expect(response.status).toEqual(200);
});
