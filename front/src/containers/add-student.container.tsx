import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { StudentService } from "../services/student.service";
import useStudentForm from "../hooks/useStudentForm";
import NavBar from "../components/navbar.component";
import StudentForm from "../components/student-form.component";

export default function AddStudent() {
  const { studentFormState, dispatchEvent, CLEAR_STUDENT } = useStudentForm();
  const { push } = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    return onUnmounting();

    function onUnmounting() {
      dispatchEvent({ name: CLEAR_STUDENT, payload: {} });
    }
  }, [dispatchEvent, CLEAR_STUDENT]);

  return (
    <>
      <NavBar />
      <div className="container p-3">
        <div className="col-4">
          <StudentForm
            title={"Add student"}
            submitButtonText={"Save"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );

  async function handleSubmit() {
    await StudentService.create({
      firstName: studentFormState.firstName,
      lastName: studentFormState.lastName,
      quote: studentFormState.quote,
    });
    push("/students");
    addToast("Student saved", {
      appearance: "success",
      autoDismiss: true,
    });
  }
}
