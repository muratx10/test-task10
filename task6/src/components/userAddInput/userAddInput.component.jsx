import React from 'react';
import classes from './userAddInput.module.scss';

const UserAddInput = ({value, change, submit}) => {
  return (
    <form
      action="#"
      className={classes.userAdd}
      onSubmit={submit}>
        <input
          type="text"
          placeholder="Type and add a new person"
          value={value.toUpperCase()}
          onChange={change}
        />
    </form>
  )
}

export default UserAddInput;
