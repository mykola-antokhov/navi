import { openDB } from 'idb';

const DATABASE_NAME = 'navi';
const STORE_NAME = 'questions';

export const getDB = async () => {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addQuestion = async ({ model, question }) => {
  const message = { answer: null, model, question, status: false };
  const db = await getDB();
  const id = await db.add(STORE_NAME, message);

  dispatchDBQuestionsUpdateEvent();

  return id;
};

export const updateMessage = async (id, data) => {
  const db = await getDB();
  const existingMessage = await db.get(STORE_NAME, id);
  const updatedMessage = { ...existingMessage, ...data };

  await db.put(STORE_NAME, updatedMessage);
};

export const getQuestions = async () => {
  const db = await getDB();

  return db.getAll(STORE_NAME);
};

export const getQuestionById = async (id) => {
  const db = await getDB();

  return db.get(STORE_NAME, id);
};

const dispatchDBQuestionsUpdateEvent = () => {
  const event = new CustomEvent('db-questions-updated');

  window.dispatchEvent(event);
};
