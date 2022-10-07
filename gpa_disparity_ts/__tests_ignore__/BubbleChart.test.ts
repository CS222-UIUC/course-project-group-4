import React from "react";
import BubbleChart from "../../src/BubbleChart";

//github.com/reactchartjs/react-chartjs-2/issues/155

https: jest.mock("react-chartjs-2", () => ({
  Bubble: () => null,
}));

it("Renders a BubbleChart", () => {
  const wrapper = mount(<BubbleChart />);
  expect(wrapper).toMatchSnapshot();
});
