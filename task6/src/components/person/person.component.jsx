import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import classes from './person.module.scss';

const Person = ({user, deleteItem}) => {
  return (
    <div className={classes.personItem}>
      <span>{user.first_name.toUpperCase()}</span>
      <FontAwesomeIcon
        icon={faTrash}
        className={classes.delete}
        onClick={() => deleteItem(user.id)} />
    </div>
  )
};

export default Person;
