import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Error404 from './routes/Error404';
import reportWebVitals from './reportWebVitals';
import { loader as rootLoader } from './components/filter/FilterSquad'
import { loader as squadLoader } from './components/squad/view-squad/Squad'
import { loader as unitsLoader } from './components/squad/create-squad/Form'
import { loader as squadEditLoader } from './components/squad/edit-squad/Form'
import ViewSquad from './routes/ViewSquad';
import Home from './routes/Home';
import CreateSquad from './routes/CreateSquad';
import UpdateSquad from './routes/UpdateSquad';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <Error404/>,
    loader: rootLoader
  },
  {
    path: "/squad/:squadId",
    element: <ViewSquad/>,
    loader: squadLoader
  },
  {
    path: "/squad/create",
    element: <CreateSquad/>,
    loader: unitsLoader
  },
  {
    path: "/squad/edit/:squadId",
    element: <UpdateSquad/>,
    loader: squadEditLoader
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
