import { useEffect, useState } from "react";

interface GpaInformationDisplayProps {
  crn: number;
  year: number;
  request_gpa_info: (crn: number, year: number) => GpaInformation;
}

/* The below interface should be in its own file (GpaInformation.tsx) as
it will also be used by database / data management
Also good practice to keep data separate from code
It's only in this file for easier viewing as sample code.
*/
export interface GpaInformation {
  subject: string;
  course_number: number;
  course_title: string;
  average_gpa: number;
}

const GpaInformationDisplay = (props: GpaInformationDisplayProps) => {
  const [gpa_info, setGpaInfo] = useState({} as GpaInformation);

  useEffect(() => {
    setGpaInfo(props.request_gpa_info(props.year, props.crn));
  }, [props.crn, props.year, props]); // will update when the crn or year changes

  console.log(gpa_info);

  return (
    <div className="gpa-information-display">
      <p>
        <b> subject: </b> {gpa_info.subject} {"\n"}
        <br /> {/* linebreak using <br /> tag*/}
        <b> course: </b> {gpa_info.course_number}
        <br />
        <b> course_title: </b> {gpa_info.course_title}
        <br />
        <b> average_gpa: </b> {gpa_info.average_gpa}
        <br />
      </p>
    </div>
  );
};

export default GpaInformationDisplay;
