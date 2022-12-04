import Modal from "react-modal";
import { Button } from "@mui/material";
import CourseInformation from "../CourseInformation";
import { fetchCourseInfo } from "../../network/DataFetcher";

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
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
      <div style={{ marginLeft: "8rem", marginRight: "8rem" }}>
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
