import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorView from '@views/Error';
import LayoutMain from '@layouts/Main';
import Main from '@views/Main';
import Question from '@views/Question';
import React from 'react';
import { routes } from '@router';

const browserRouter = createBrowserRouter([
  {
    path: routes.main,
    element: <LayoutMain />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: routes.questionsItem,
        element: <Question />,
      },
    ],
  },
]);

const RouterMain = () => <RouterProvider router={browserRouter} />;

export default RouterMain;
