import { useReducer, useMemo, createContext, ReactNode, Dispatch } from "react";

enum EventName {
  STUDENT_LOADED = "STUDENT_LOADED",
  EDIT_FIRSTNAME = "EDIT_FIRSTNAME",
  EDIT_LASTNAME = "EDIT_LASTNAME",
  EDIT_QUOTE = "EDIT_QUOTE",
  CLEAR_STUDENT = "CLEAR_STUDENT",
}

type ContextValue = {
  studentFormState: State;
  dispatchEvent: Dispatch<Event>;
};

interface Event {
  name: string;
  payload: { [key: string]: any };
}
interface State {
  firstName: string;
  lastName: string;
  quote: string;
}

export const {
  STUDENT_LOADED,
  EDIT_FIRSTNAME,
  EDIT_LASTNAME,
  EDIT_QUOTE,
  CLEAR_STUDENT,
} = EventName;
export const StudentFormContext = createContext<ContextValue | undefined>(
  undefined
);
const initialState: State = {
  firstName: "",
  lastName: "",
  quote: "",
};

function reducer(state: State = initialState, event: Event): State {
  switch (event.name) {
    default:
      return state;
    case STUDENT_LOADED:
      return {
        firstName: event.payload.firstName,
        lastName: event.payload.lastName,
        quote: event.payload.quote,
      };
    case EDIT_FIRSTNAME:
      return {
        ...state,
        firstName: event.payload.firstName,
      };
    case EDIT_LASTNAME:
      return { ...state, lastName: event.payload.lastName };
    case EDIT_QUOTE:
      return { ...state, quote: event.payload.quote };
    case CLEAR_STUDENT:
      return {
        firstName: "",
        lastName: "",
        quote: "",
      };
  }
}

export function StudentFormContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [studentFormState, dispatchEvent] = useReducer(reducer, initialState);
  const memoizedContextValue = useMemo(
    () => ({
      studentFormState,
      dispatchEvent,
    }),
    [studentFormState, dispatchEvent]
  );

  return (
    <StudentFormContext.Provider value={memoizedContextValue}>
      {children}
    </StudentFormContext.Provider>
  );
}
