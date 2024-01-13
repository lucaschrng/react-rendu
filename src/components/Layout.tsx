import { Outlet } from 'react-router-dom';
import Cart from './Cart';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Cart />
    </>
  );
};

export default Layout;