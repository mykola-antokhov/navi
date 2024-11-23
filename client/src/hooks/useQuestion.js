import { useState, useEffect } from 'react';
import { getQuestionById } from '@db/IndexDB';

const useQuestion = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const item = await getQuestionById(questionId);

      setQuestion(item);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  return { question, loading, error };
};

export default useQuestion;
