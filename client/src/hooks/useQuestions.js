import { useState, useEffect } from 'react';
import { getQuestions } from '@db/IndexDB';

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const allItems = await getQuestions();

      setQuestions(allItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();

    window.addEventListener('db-questions-updated', fetchQuestions);

    return () => {
      window.removeEventListener('db-questions-updated', fetchQuestions);
    };
  }, []);

  return { questions, loading, error };
};

export default useQuestions;
