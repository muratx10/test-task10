import React, { useContext } from 'react';
import { Context } from '../../context';
import classes from './userAddInput.module.scss';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserAddInput = ({value, change, submit}) => {
  const context = useContext(Context);
  return (
    <form
      action="#"
      className={classes.userAdd}
      onSubmit={submit}>
      <label htmlFor="user">
        <input
          name="user"
          type="text"
          placeholder="Type and add a new person"
          value={value.toUpperCase()}
          onChange={change}
        />
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={classes.userAddIcon}
          onClick={context.onSubmit}
        />
      </label>

    </form>
  )
}

export default UserAddInput;
