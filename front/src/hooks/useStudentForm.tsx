import { useContext } from "react";
import {
  StudentFormContext,
  STUDENT_LOADED,
  EDIT_FIRSTNAME,
  EDIT_LASTNAME,
  EDIT_QUOTE,
  CLEAR_STUDENT,
} from "../contexts/student-form.context";

function useStudentForm() {
  const contextValue = useContext(StudentFormContext);

  if (contextValue === undefined) {
    throw new Error(`No provider for StudentContext given`);
  }

  return {
    ...contextValue,
    STUDENT_LOADED,
    EDIT_FIRSTNAME,
    EDIT_LASTNAME,
    EDIT_QUOTE,
    CLEAR_STUDENT,
  };
}

export default useStudentForm;
