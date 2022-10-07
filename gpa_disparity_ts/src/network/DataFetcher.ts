export default class DataFetcher {
  async fetchGpaInformation() {
    const url = "https://github.com/wadefagen/datasets/tree/master/gpa";
    const response = await fetch(url);
    return response;
  }
}

// example commandline usage(?):
// npx ts-node -O '{"module":"commonjs"}' ./src/network/DataFetcher.ts

// const df = new DataFetcher();
// df.fetchGpaInformation().then(console.log);
