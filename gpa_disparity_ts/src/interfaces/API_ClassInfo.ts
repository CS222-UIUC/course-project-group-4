export interface ApiGpaInfo {
  a_plus: string;
  a: string;
  a_minus: string;
  b_plus: string;
  b: string;
  b_minus: string;
  c_plus: string;
  c: string;
  c_minus: string;
  d_plus: string;
  d: string;
  d_minus: string;
  f: string;
}
export interface ApiClassInfo extends ApiGpaInfo {
  id: string;
  number: string;
  percent_4: string;
  primary_instructor: string;
  schedule_type: string;
  section?: string | null;
  subject: string;
  term: string;
  title: string;
  w: string;
  avg: string;
  year: string;
}
