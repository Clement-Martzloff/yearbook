import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { StudentFormContextProvider } from "./contexts/student-form.context";
import { SearchBarContextProvider } from "./contexts/search-bar.context";
import ListStudent from "./containers/list-student.container";
import ShowStudent from "./containers/show-student.container";
import AddStudent from "./containers/add-student.container";

export default function App() {
  return (
    <ToastProvider>
      <StudentFormContextProvider>
        <SearchBarContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={["/", "/students"]} component={ListStudent} />
              <Route exact path="/add" component={AddStudent} />
              <Route path="/students/:id" component={ShowStudent} />
            </Switch>
          </BrowserRouter>
        </SearchBarContextProvider>
      </StudentFormContextProvider>
    </ToastProvider>
  );
}
