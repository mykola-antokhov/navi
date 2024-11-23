import NavItem from './NavItem';
import React from 'react';
import styles from './index.module.scss';
import useQuestions from '@hooks/useQuestions';

const Navigation = () => {
  const { questions } = useQuestions();

  return (
    <nav className={styles.wrapper}>
      {questions.map((item) => (
        <NavItem id={item.id} key={item.id} question={item.question} />
      ))}
    </nav>
  );
};

export default Navigation;
