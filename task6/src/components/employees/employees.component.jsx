import React from 'react';
import Person from '../person';
import UserAddInput from '../userAddInput';
import classes from './employees.module.scss';

class Employees extends React.PureComponent {
  state = {
    list: [],
    value: '',
  }

  componentDidMount() {
    if(this.state.list.length === 0)
      fetch('https://reqres.in/api/users?per_page=12')
      .then(res => res.json())
      .then(list => this.setState({list: list.data}));
  }

  delete = (id) => {
    this.setState(state => ({
      list: state.list.filter(item => {
        return item.id !== id;
      }),
    }))
  }

  onChange = (e) => {
    e.persist();
    this.setState(state => ({
      value: e.target.value
    }))
  }

  onSubmit = () => {
    this.setState(state => ({
     list: [...state.list, {
       first_name: state.value,
       id: new Date().getMilliseconds()
     }],
      value: ''
    }))
  }


  render() {
    const {list} = this.state;
    return (
      <>
        <UserAddInput
          value={this.state.value}
          change={this.onChange}
          submit={this.onSubmit}
        />
        <div className={classes.employees}>
          {list.map(user => (
            <Person key={user.id} user={user} deleteItem={this.delete} />
          ))}
        </div>
      </>
    )
  }
}

export default Employees;
