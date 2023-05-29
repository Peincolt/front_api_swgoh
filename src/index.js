import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Error404 from './routes/Error404';
import reportWebVitals from './reportWebVitals';
import { loader as rootLoader } from './components/filter/FilterSquad'
import { loader as squadLoader } from './components/view-squad/Squad'
import ViewSquad from './routes/ViewSquad';
import Root from './routes/Root';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    loader: rootLoader
  },
  {
    path: "/squad/:squadId",
    element: <ViewSquad/>,
    loader: squadLoader
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
