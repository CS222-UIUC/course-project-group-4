import processApiClassInfo from "../components/GpaChart/utility/GpaApiUtility";
import { FormatDataForChart } from "../components/GpaChart/utility/GpaChartUtility";
import { ApiClassInfo } from "../interfaces/API_ClassInfo";

const BASE_URL = "https://api-endpoint-jmjeluvcva-uc.a.run.app";

export const fetchGPAInfo = async (subject: string) => {
  const url = new URL(`${BASE_URL}/gpa-info/?subject=${subject}`);
  const response = await fetch(url.toString());
  return response.json();
};

export const fetchSubjects = async () => {
  const url = new URL(`${BASE_URL}/all-subjects/`);
  const response = await fetch(url.toString());
  return response.json();
};

export const fetchCourseInfo = async (subj: string, num: any) => {
  const params = { subject: subj, number: num };
  const encoded_params = new URLSearchParams(params).toString();
  const url = new URL(`${BASE_URL}/course-info/?${encoded_params}`);
  const response = await fetch(url);
  return response.json();
};

// fetchGPAInfo("ECE").then((api_gpa_response: ApiClassInfo[]) => {
//   const gpas = processApiClassInfo(api_gpa_response);
//   const chart_data = processApiGpaInformation(gpas);
// });

export const dummyFetchCourseNumbers = (subject: String) => {
  return async () => ["120", "130", "140"];
};
