import { Link } from 'react-router-dom';
import React from 'react';
import router from '@router';
import styles from './index.module.scss';


const NavItem = ({ id, question }) => (
  <div className={styles.wrapper}>
    <Link to={router.build('questionsItem', { questionId: id })}>
      {question}
    </Link>
  </div>
);

export default NavItem;
