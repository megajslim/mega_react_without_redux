import React from "react";
import { Switch, Route } from "react-router-dom";
import TeamSugiList from './components/teamSugiList'
import "./App.css";
import TeamSugi from "./components/teamSugi";
import TeamSugiAdd from "./components/teamSugiAdd";
function App() {
  return (
    <Switch>
      <Route exact path='/' component={TeamSugiList} />
      <Route exact path='/teamsugi' component={TeamSugiList} />
      <Route path="/teamsugi/:id" component={TeamSugi} />
      <Route exact path="/add" component={TeamSugiAdd} />
    </Switch>
  );
}

export default App;
