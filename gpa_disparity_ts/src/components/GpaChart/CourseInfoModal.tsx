import { Button, Modal } from "@mui/material";
import CourseInformation from "../CourseInformation";
import { fetchCourseInfo } from "../../network/DataFetcher";
import React from "react";

interface CourseInfoModalProps {
  isOpen: any;
  subject: any;
  courseNumber: any;
  closeModal: any;
}

export const CourseInfoModal = (props: CourseInfoModalProps) => {
  const {
    isOpen: modalIsOpen,
    subject: modalSubject,
    courseNumber: modalCourseNumber,
    closeModal,
  } = props;
  return (
    <Modal
      open={modalIsOpen}
      onClose={() => closeModal()}
      aria-labelledby="course-information"
      aria-describedby="displays-course-information"
    >
      <div
        style={{
          marginLeft: "8rem",
          marginRight: "8rem",
          marginTop: "8rem",
          backgroundColor: "white",
          padding: "4rem",
        }}
      >
        <Button
          onClick={() => {
            closeModal();
          }}
          variant="contained"
          color="primary"
          size="medium"
        >
          Back To GPA Graph
        </Button>
        <CourseInformation
          subject={String(modalSubject)}
          course_number={Number(modalCourseNumber)}
          requestCourseInfo={fetchCourseInfo}
        />
      </div>
    </Modal>
  );
};
