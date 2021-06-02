import React from "react";
import { Switch, Route } from "react-router-dom";
import TeamSugiList from './components/teamSugiList'
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path='/' component={TeamSugiList} />
    </Switch>
  );
}

export default App;
