import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import styles from './index.module.scss';

const Main = () => (
  <div className={styles.wrapper}>
    <Navigation />
    <Outlet />
    <QuestionForm />
  </div>
);

export default Main;
