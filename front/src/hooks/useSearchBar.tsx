import { useContext } from "react";
import { SearchBarContext, CHANGE_TERM } from "../contexts/search-bar.context";

function useStudentForm() {
  const contextValue = useContext(SearchBarContext);

  if (contextValue === undefined) {
    throw new Error(`No provider for StudentContext given`);
  }

  return {
    ...contextValue,
    CHANGE_TERM,
  };
}

export default useStudentForm;
