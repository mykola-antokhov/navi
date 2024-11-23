import { useState, useEffect } from 'react';
import { getQuestions } from '@db/IndexDB';

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const allItems = await getQuestions();

    setQuestions(allItems);
  };

  useEffect(() => {
    fetchQuestions();

    window.addEventListener('db-questions-updated', fetchQuestions);

    return () => {
      window.removeEventListener('db-questions-updated', fetchQuestions);
    };
  }, []);

  return questions;
};

export default useQuestions;
