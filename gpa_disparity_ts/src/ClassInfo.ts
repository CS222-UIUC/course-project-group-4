export default interface ClassInfo {
    // the inputs
    // data: {
    a_plus_val: string;
    a_val: string;
    a_minus_val: string;
    b_plus_val: string;
    b_val: string;
    b_minus_val: string;
    c_plus_val: string;
    c_val: string;
    c_minus_val: string;
    d_plus_val: string;
    d_val: string;
    d_minus_val: string;
    f_val: string;
    class_number: string;
    // };
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