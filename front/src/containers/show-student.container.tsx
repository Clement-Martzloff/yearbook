import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { StudentService } from "../services/student.service";
import useStudentForm from "../hooks/useStudentForm";
import NavBar from "../components/navbar.component";
import StudentForm from "../components/student-form.component";

export default function ShowStudent() {
  const { id } = useParams<{ id: string }>();
  const {
    studentFormState,
    dispatchEvent,
    STUDENT_LOADED,
    CLEAR_STUDENT,
  } = useStudentForm();
  const { push } = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    executePipeline();

    return onUnmounting();

    async function executePipeline() {
      const response = await StudentService.get(id);

      dispatchEvent({ name: STUDENT_LOADED, payload: response.data });
    }

    function onUnmounting() {
      dispatchEvent({ name: CLEAR_STUDENT, payload: {} });
    }
  }, [id, dispatchEvent, STUDENT_LOADED, CLEAR_STUDENT]);

  return (
    <>
      <NavBar />
      <div className="container p-3">
        <div className="col-4">
          {studentFormState.firstName ? (
            <StudentForm
              title={"Show student"}
              submitButtonText={"Update"}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  async function handleSubmit() {
    await StudentService.update(id, {
      firstName: studentFormState.firstName,
      lastName: studentFormState.lastName,
      quote: studentFormState.quote,
    });
    push("/students");
    addToast("Student updated", {
      appearance: "success",
      autoDismiss: true,
    });
  }
}
