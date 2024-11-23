import { addQuestion } from '@db/IndexDB';
import router from '@router';
import styles from './index.module.scss';
import useAiModels from '@hooks/useAiModels';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const QuestionForm = () => {
  const navigate = useNavigate();
  const { models } = useAiModels();
  const [question, setQuestion] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const formDisabled = !selectedModel || !question;

  const onQuestionChange = (e) => setQuestion(e.target.value);

  const onModelChange = (e) => setSelectedModel(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const questionId = await addQuestion({ model: selectedModel, question });

    navigate(router.build('questionsItem', { questionId }));
    setQuestion('');
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <select value={selectedModel} onChange={onModelChange}>
          <option value="" disabled>Select a model</option>
          {models && Object.keys(models).map((provider) => models[provider].map((model) =>(
            <option key={model} value={model}>
              {model}
            </option>
          )))}
        </select>
      <input onChange={onQuestionChange} type="text" value={question} />
      <button disabled={formDisabled} type="submit">Ask</button>
    </form>
  );
};

export default QuestionForm;
