import { GpaInformation } from "../network/GpaInformation";
import {
  PrepareGpaInformationForChart,
  processGpaInformation,
} from "./BubbleChartUtility";

const retrieveGpasFromApi = async (
  subject: string
): Promise<GpaInformation[]> => {
  const cs125: GpaInformation = {
    subject: "CS",
    course_number: 125,
    percent_four_point_zero: 95,
    class_size: 1000,
    average_gpa: 3.7,
  };
  const cs225: GpaInformation = {
    subject: "CS",
    course_number: 225,
    percent_four_point_zero: 80,
    class_size: 100,
    average_gpa: 2.5,
  };
  return [cs125, cs225];
};

test("PrepareGpaInformationForChart properly formats data", async () => {
  const gpas = await retrieveGpasFromApi("CS");
  const prepared_data = PrepareGpaInformationForChart(gpas);
  const data_to_render = processGpaInformation(prepared_data);
  expect(data_to_render).toEqual({
    datasets: [
      {
        backgroundColor: "rgba(75, 161, 200, 0.8)",
        data: [{ percent: "Percent: ", r: 20, x: 3.7, y: 95 }],
        label: "CS 125",
      },
      {
        backgroundColor: "rgba(75, 161, 200, 0.8)",
        data: [{ percent: "Percent: ", r: 20, x: 2.5, y: 80 }],
        label: "CS 225",
      },
    ],
  });
  //   expect(prepared_data).toEqual(
  //     [
  //         {
  //             "average_gpa": 3.7,
  //             "class_size": 1000,
  //             "class_size_radius": 20,
  //             "course_number": 125,
  //             "gpa_color": {
  //                 "blue": 193,
  //                 "getBlue": [Function anonymous],
  //                 "getGreen": [Function anonymous],
  //                 "getRed": [Function anonymous],
  //                 "green": 144,
  //                 "red": 110
  //             },
  //             "percent_four_point_zero": 95,
  //             "subject": "CS"
  //         },
  //         {
  //             "average_gpa": 2.5,
  //             "class_size": 100,
  //             "class_size_radius": 5,
  //             "course_number": 225,
  //             "gpa_color": {
  //                 "blue": 179,
  //                 "getBlue": [Function anonymous],
  //                 "getGreen": [Function anonymous],
  //                 "getRed": [Function anonymous],
  //                 "green": 112,
  //                 "red": 176
  //             },
  //             "percent_four_point_zero": 80,
  //             "subject": "CS"
  //         }
  //     ]);
});
