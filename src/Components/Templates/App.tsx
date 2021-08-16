import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "../Pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
}

export default App;
