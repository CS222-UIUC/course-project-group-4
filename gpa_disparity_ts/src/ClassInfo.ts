export default interface ClassInfo {
  // the inputs
  // data: {
  a: string;
  subject: string;
  b: string;
  c: string;
  d: string;
  c_minus: string;
  f: string;
  b_plus: string;
  percent_4: string;
  section?: string | null;
  w: string;
  a_minus: string;
  id: string;
  schedule_type: string;
  a_plus: string;
  b_minus: string;
  term: string;
  d_minus: string;
  d_plus: string;
  avg: string;
  c_plus: string;
  number: string;
  year: string;
  primary_instructor: string;
  title: string;
}

// wanted to try and make an interface with the correct data type and information already set, not sure how
// feasible this is

//   export default interface ClassInfo({data}: Inputs) => {
//     a_plus: +data.a_plus_val;
//     a: +data.a_val;
//     a_minus: +data.a_minus_val;
//     b_plus: +data.b_plus_val;
//     b: +data.b_val;
//     b_minus: +data.b_minus_val;
//     c_plus: +data.c_plus_val;
//     c: +data.c_val;
//     c_minus: +data.c_minus_val;
//     d_plus: +data.d_plus_val;
//     d: +data.d_val;
//     d_minus: +data.d_minus_val;
//     f: +data.f_val;
// }
