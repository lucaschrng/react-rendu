import { Outlet } from 'react-router-dom';
import Cart from './Cart';

const Layout = () => {
  return (
    <>
      <header>
        <Cart />
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default Layout;