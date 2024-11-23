import { useEffect, useState } from 'react';
import Content from './Content';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import useQuestion from '@hooks/useQuestion';

const Question = () => {
  const { questionId } = useParams();
  const question = useQuestion({ questionId: Number(questionId) });

  return (
    <div className={styles.wrapper}>
      {question && <Content {...question} />}
    </div>
  );
};

export default Question;
