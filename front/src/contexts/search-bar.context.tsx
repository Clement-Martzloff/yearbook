import { useReducer, useMemo, createContext, ReactNode, Dispatch } from "react";

enum EventName {
  CHANGE_TERM = "CHANGE_TERM",
}

type ContextValue = {
  searchBarState: State;
  dispatchEvent: Dispatch<Event>;
};

interface Event {
  name: string;
  payload: { [key: string]: any };
}
interface State {
  term: string;
}

export const { CHANGE_TERM } = EventName;
export const SearchBarContext = createContext<ContextValue | undefined>(
  undefined
);
const initialState: State = {
  term: "",
};

function reducer(state: State = initialState, event: Event): State {
  switch (event.name) {
    default:
      return state;
    case CHANGE_TERM:
      return {
        term: event.payload.term,
      };
  }
}

export function SearchBarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchBarState, dispatchEvent] = useReducer(reducer, initialState);
  const memoizedContextValue = useMemo(
    () => ({
      searchBarState,
      dispatchEvent,
    }),
    [searchBarState, dispatchEvent]
  );

  return (
    <SearchBarContext.Provider value={memoizedContextValue}>
      {children}
    </SearchBarContext.Provider>
  );
}
