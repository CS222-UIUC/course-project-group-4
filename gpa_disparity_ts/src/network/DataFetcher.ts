/*
export default class DataFetcher {
  async fetchGpaInformation() {
    const url = "https://github.com/wadefagen/datasets/tree/master/gpa";
    const response = await fetch(url);
    return response;
  }
}
*/
const BASE_URL = "https://api-endpoint-jmjeluvcva-uc.a.run.app";
export const fetchCourseInfo = async (subj: string, num: any) => {
  const params = { subject: subj, number: num };
  const encoded_params = new URLSearchParams(params).toString();
  const url = new URL(`${BASE_URL}/course-info/?${encoded_params}`);
  const response = await fetch(url);
  return response.json();
};  

export const fetchGPAInfo = async (gpa: string, num: any) => {
  const params = { GPA: gpa, number: num };
  const encoded_params = new URLSearchParams(params).toString();
  const url = new URL(`${BASE_URL}/gpa-info/?${encoded_params}`);
  const response = await fetch(url);
  return response.json();
};  



