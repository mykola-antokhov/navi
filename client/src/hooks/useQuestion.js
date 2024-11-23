import { useState, useEffect } from 'react';
import { getQuestionById } from '@db/IndexDB';

const useQuestion = ({ questionId }) => {
  const [question, setQuestion] = useState(null);

  const fetchQuestion = async () => {
    const item = await getQuestionById(questionId);

    setQuestion(item);
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  return question;
};

export default useQuestion;
