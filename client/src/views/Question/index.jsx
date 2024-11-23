import { useEffect, useState } from 'react';
import Content from './Content';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import useQuestion from '@hooks/useQuestion';

const Question = () => {
  const { questionId } = useParams();
  const { question, loading } = useQuestion({ questionId: Number(questionId) });

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.wrapper}>
      {question ? (
        <Content {...question} />
      ) : (
        <p>Message not found</p>
      )}
    </div>
  );
};

export default Question;
