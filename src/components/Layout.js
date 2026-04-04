import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  return (
    <div className="app-shell">
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-glow" aria-hidden="true" />
      <NavBar />
      <main className="page-wrap">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
