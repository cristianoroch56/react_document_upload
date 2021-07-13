import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact strict path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
