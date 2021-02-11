import { Link } from "react-router-dom";

interface StudentTableProps {
  students: any[];
  deleteAllStudents: () => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

export default function StudentTable(props: StudentTableProps) {
  const { students, deleteAllStudents, deleteStudent } = props;

  return (
    <>
      <div className="d-md-flex align-items-center">
        <h2>Students list</h2>
        <button
          className="btn btn-sm btn-outline-primary mx-3"
          onClick={deleteAllStudents}
        >
          Delete all
        </button>
      </div>
      <table className="table table-borderless table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Quote</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student: any) => (
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.quote}</td>
                <td>
                  <Link
                    to={"/students/" + student.id}
                    className="btn btn-primary btn-sm me-3"
                  >
                    Show
                  </Link>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
