import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Records from './pages/Records';
import Configuration from './pages/Configuration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/records',
    element: <Records />,
  },
  {
    path: '/configuration',
    element: <Configuration />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>,
);
