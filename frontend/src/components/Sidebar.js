import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar-hover">
      <div className="sidebar-logo">🍽️ <span className="label">ResBook</span></div>
      <nav className="sidebar-menu">
        {isLoginPage && (
          <Link to="/signup" className="menu-item">
            🆕 <span className="label">Εγγραφή</span>
          </Link>
        )}
        {isSignUpPage && (
          <Link to="/login" className="menu-item">
            🔑 <span className="label">Σύνδεση</span>
          </Link>
        )}

        {!isLoginPage && !isSignUpPage && isLoggedIn && (
          <>
            <Link to="/restaurants" className="menu-item">
              🍴 <span className="label">Εστιατόρια</span>
            </Link>
            <Link to="/reservations" className="menu-item">
              📖 <span className="label">Κρατήσεις</span>
            </Link>
            <Link to="/new-reservation" className="menu-item">
              📝 <span className="label">Νέα Κράτηση</span>
            </Link>
            <button onClick={handleLogout} className="menu-item">
              🚪 <span className="label">Αποσύνδεση</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
