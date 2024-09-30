import { Outlet } from 'react-router-dom';
import Header from './Header';  // Seu componente de Header

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aqui suas páginas vão ser renderizadas */}
      </main>
    </>
  );
};

export default Layout;