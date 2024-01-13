import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import Product from './pages/Product';
import { CartProvider } from './providers/CartContext';
import Layout from './components/Layout';

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/products/:id',
      element: <Product />,
    },
  ],
}]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CartProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </CartProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
