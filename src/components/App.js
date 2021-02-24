import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(){
  return (
    <div className="container" style={{textAlign: "center"}}>
      <Router>
        <Header />
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <TicketControl />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;