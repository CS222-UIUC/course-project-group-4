export default class DataFetcher {
  async fetchGpaInformation() {
    const url = "https://github.com/wadefagen/datasets/tree/master/gpa";
    const response = await fetch(url);
    return response;
  }
}

// allows viewing response when run from commandline
const df = new DataFetcher();
df.fetchGpaInformation().then(console.log);
