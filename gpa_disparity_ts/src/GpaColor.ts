export class Color {
  red: number;
  green: number;
  blue: number;

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  getRed = () => this.red;
  getGreen = () => this.green;
  getBlue = () => this.blue;
}

const GOOD_GRADE_COLOR = new Color(75, 161, 200);
const BAD_GRADE_COLOR = new Color(204, 99, 173);
const MIN_GPA = 2.0;
const MAX_GPA = 4.333;

const scaleColor = (
  gpa: number,
  good_color_value: number,
  bad_color_value: number
): number => {
  return Math.round(
    bad_color_value +
      ((good_color_value - bad_color_value) * (gpa - MIN_GPA)) /
        (MAX_GPA - MIN_GPA)
  );
};

export class GpaColor extends Color {
  constructor(gpa: number) {
    if (gpa < 2) {
      gpa = 2;
    }
    const red = scaleColor(
      gpa,
      GOOD_GRADE_COLOR.getRed(),
      BAD_GRADE_COLOR.getRed()
    );
    const green = scaleColor(
      gpa,
      GOOD_GRADE_COLOR.getGreen(),
      BAD_GRADE_COLOR.getGreen()
    );
    const blue = scaleColor(
      gpa,
      GOOD_GRADE_COLOR.getBlue(),
      BAD_GRADE_COLOR.getBlue()
    );
    super(red, green, blue);
  }
}
