import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import classes from "./App.module.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/header/index";
import Homepage from "./components/homepage/index";
import Employees from "./components/employees/index";

function App() {
  return (
      <div>
        <BrowserRouter>
            <div className={classes.header}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <Header />
            </div>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/employees" component={Employees} />
            </Switch>
        </BrowserRouter>
      </div>
  )
}

export default App;
