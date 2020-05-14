import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Clientlist from "./components/Clientlist";
import Traininglist from "./components/Traininglist";
import Navigator from "./components/Navigator";
import Calendar from "./components/Calendar";
import Exercisecharts from "./components/Exercisecharts";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navigator />
          <Switch>
            <Route exact path="/" component={Clientlist} />
            <Route path="/about" component={Traininglist} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/charts" component={Exercisecharts} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
