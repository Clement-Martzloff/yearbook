import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import useSearchBar from "../hooks/useSearchBar";
import { StudentService } from "../services/student.service";
import NavBar from "../components/navbar.component";
import SearchBar from "../components/search-bar.component";
import StudentTable from "../components/student-table.component";

export default function ListStudent() {
  interface ListStudentState {
    students: any[];
    isFresh: boolean;
  }

  const initialState: ListStudentState = {
    students: [],
    isFresh: true,
  };
  const [listStudentState, setListStudentState] = useState(initialState);
  const { searchBarState } = useSearchBar();
  const { addToast } = useToasts();

  useEffect(() => {
    executePipeline();

    async function executePipeline() {
      const response = await StudentService.fullTextSearch(searchBarState.term);

      setListStudentState((prevState) => ({
        ...prevState,
        students: response.data,
        isFresh: true,
      }));
    }
  }, [searchBarState.term, listStudentState.isFresh]);

  return (
    <>
      <NavBar />
      <SearchBar />
      <div className="container p-3">
        <div className="col-12">
          <StudentTable
            students={listStudentState.students}
            deleteAllStudents={deleteAllStudents}
            deleteStudent={deleteStudent}
          />
        </div>
      </div>
    </>
  );

  async function deleteAllStudents() {
    // json-db seems to not handle parallel request properly
    for (const student of listStudentState.students) {
      await StudentService.erase(student.id);
    }

    refreshStudentTable();
    addToast("All students deleted", {
      appearance: "success",
      autoDismiss: true,
    });
  }

  async function deleteStudent(id: string) {
    await StudentService.erase(id);
    refreshStudentTable();
    addToast("Student deleted", {
      appearance: "success",
      autoDismiss: true,
    });
  }

  function refreshStudentTable() {
    setListStudentState((prevState) => ({
      ...prevState,
      isFresh: false,
    }));
  }
}
