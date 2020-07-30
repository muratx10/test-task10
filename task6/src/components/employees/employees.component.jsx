import React, { useContext } from 'react';
import { Context } from '../../context';
import Person from '../person';
import UserAddInput from '../userAddInput';
import classes from './employees.module.scss';

const Employees = () => {
  const context = useContext(Context);
  return (
    <>
      <UserAddInput
        value={context.state.value}
        change={context.onChange}
        submit={context.onSubmit}
      />
      <div className={classes.employees}>
        {context.state.list.map(user => (
          <Person key={user.id} user={user} deleteItem={context.onDelete} />
        ))}
      </div>
    </>
  )
}

export default Employees;
