import React, { useEffect, useState } from 'react';
import { updateMessage } from '@db/IndexDB';

const Content = ({ answer, id, model, question, status }) => {
  const [streamedData, setStreamedData] = useState([]);

  useEffect(() => {
    if (status && answer) return;

    setStreamedData([]);

    const fetchMessages = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, question }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let allChunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          updateMessage(id, { answer: allChunks.join(''), status: true });
          break;
        }

        const chunk = decoder.decode(value).split('\n\n').filter(Boolean);
        const content = chunk.map((c) => JSON.parse(c.replace('data: ', '')).content);

        allChunks = allChunks.concat(content);
        setStreamedData((prev) => prev.concat(content));
      }
    };

    fetchMessages();
  }, [id, answer]);

  return (
    <div>
      <h3>Model:</h3>
      <p>{model}</p>
      <h3>Question:</h3>
      <p>{question}</p>
      <h3>Answer:</h3>
      <p>{status ? answer : streamedData}</p>
    </div>
  );
}

export default Content;
