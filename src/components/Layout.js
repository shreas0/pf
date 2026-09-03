import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import BioBot from './BioBot';

function Layout() {
  return (
    <div className="app-shell">
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-glow" aria-hidden="true" />
      <NavBar />
      <main className="page-wrap">
        <Outlet />
      </main>

      <BioBot />
    </div>
  );
}

export default Layout;
