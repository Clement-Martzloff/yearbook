import useStudentForm from "../hooks/useStudentForm";

interface StudentFormProps {
  title: string;
  submitButtonText: string;
  handleSubmit: () => Promise<void>;
}

export default function StudentForm(props: StudentFormProps) {
  const {
    studentFormState,
    dispatchEvent,
    EDIT_FIRSTNAME,
    EDIT_LASTNAME,
    EDIT_QUOTE,
  } = useStudentForm();

  const { title, submitButtonText, handleSubmit } = props;

  return (
    <>
      <h2>{title}</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstname">
            <h5>Firstname</h5>
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="firstname"
            value={studentFormState.firstName}
            placeholder={
              studentFormState.firstName
                ? studentFormState.firstName
                : "What's your firstName ?"
            }
            onChange={(event) => {
              dispatchEvent({
                name: EDIT_FIRSTNAME,
                payload: { firstName: event.target.value },
              });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">
            <h5>Lastname</h5>
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="lastname"
            value={studentFormState.lastName}
            placeholder={
              studentFormState.lastName
                ? studentFormState.lastName
                : "What's your lastname ?"
            }
            onChange={(event) =>
              dispatchEvent({
                name: EDIT_LASTNAME,
                payload: { lastName: event.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote">
            <h5>Quote</h5>
          </label>
          <textarea
            className="form-control mb-3"
            id="quote"
            value={studentFormState.quote}
            rows={3}
            placeholder={
              studentFormState.quote
                ? studentFormState.quote
                : "Type something brilliant about you."
            }
            onChange={(event) =>
              dispatchEvent({
                name: EDIT_QUOTE,
                payload: { quote: event.target.value },
              })
            }
          />
        </div>
      </form>
      <div className="d-flex flex-row-reverse">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={async (event) => {
            event.preventDefault();
            await handleSubmit();
          }}
        >
          {submitButtonText}
        </button>
      </div>
    </>
  );
}
