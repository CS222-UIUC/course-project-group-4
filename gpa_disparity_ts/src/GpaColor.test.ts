import { GpaColor } from "./GpaColor";

test("bad grade colors", () => {
  const gpaColor = new GpaColor(1);
  expect(gpaColor.getRed()).toEqual(204);
  expect(gpaColor.getGreen()).toEqual(99);
  expect(gpaColor.getBlue()).toEqual(173);
});

test("A+ grade colors", () => {
  const gpaColor = new GpaColor(4.33);
  expect(gpaColor.getRed()).toEqual(75);
  expect(gpaColor.getGreen()).toEqual(161);
  expect(gpaColor.getBlue()).toEqual(200);
});
