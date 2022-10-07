// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import React from "react";

export default class DataFetcher {
  async fetchGpaInformation() {
    const url = "https://github.com/wadefagen/datasets/tree/master/gpa";
    const response = await fetch(url);
    return response;
  }
}

// npx ts-node -O '{"module":"commonjs"}' ./src/network/DataFetcher.ts
// const df = new DataFetcher();
// df.fetchGpaInformation().then(console.log);
