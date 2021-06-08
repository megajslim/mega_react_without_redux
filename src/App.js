import React from "react";
import { Switch, Route } from "react-router-dom";
import TeamSugiList from './components/teamSugiList'
import "./App.css";
import TeamSugi from "./components/teamSugi";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={TeamSugiList} />
      <Route exact path='/teamsugi' component={TeamSugiList} />
      <Route path="/teamsugi/:id" component={TeamSugi} />
    </Switch>
  );
}

export default App;
