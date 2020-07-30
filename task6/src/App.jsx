import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classes from './App.module.scss';
import Employees from './components/employees/index';
import Header from './components/header/index';
import Homepage from './components/homepage/index';
import { Context } from './context';
import { ReactComponent as Logo } from './logo.svg';

class App extends React.PureComponent {
  state = {
    list: [],
    value: '',
  };

  componentDidMount() {
    if (this.state.list.length === 0) {
      fetch('https://reqres.in/api/users?per_page=12')
        .then(res => res.json())
        .then(list => this.setState({list: list.data}));
    }
  }

  onDelete = (id) => {
    this.setState(state => ({
      list: state.list.filter(item => {
        return item.id !== id;
      }),
    }))
  }

  onChange = (e) => {
    e.persist();
    this.setState(state => ({
      value: e.target.value,
    }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.value) {
      this.setState(state => ({
        list: [...state.list, {
          first_name: state.value.trim(),
          id: new Date().getMilliseconds(),
        }],
        value: '',
      }))
    }
  }

  render() {
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
            <Context.Provider
              value={{
                state: this.state,
                onDelete: this.onDelete,
                onChange: this.onChange,
                onSubmit: this.onSubmit,
              }}
            >
              <Route exact path="/" component={Homepage} />
              <Route path="/employees" component={Employees} />
            </Context.Provider>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
