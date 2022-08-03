import { ReactComponent as Logout } from "assets/icon/logout.svg";
import { abreviate, nameAndLastname } from "util/fns";
import { UserContext } from "context/UserContext";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function DisplayUser() {
  const { user, setUser } = useContext(UserContext);
  const fullName = `${user.name}-${user.surname}`;
  const navigate = useNavigate();

  const closeUser = () => {
    setUser(null);
    localStorage.clear();
    navigate("/")
  };

  const renderMenuUserOrAdmin = (user) => {
    switch (user.rolName) {
      case "USER":
        return (
          <>
            <Link to="/bookings" className="link_navbar">Mis reservas</Link>
            <Link to="/likes" className="link_navbar">Mis favoritos</Link>
          </>
        );
      case "ADMIN":
        return (
          <>
            <Link to="/" className="link_navbar">Administración</Link>
          </>
        );
      default:
        return (
          <>
          </>
        );
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {user && renderMenuUserOrAdmin(user)}
      <div className="display__user">
        <div className="display__user-avatar">
          <p className="display__user-chart">{abreviate(fullName)}</p>
        </div>
        <div className="display__user-name">
          <p>Hola,</p>
          <p>{nameAndLastname(fullName)}</p>
        </div>
        <p className="display__user-close" onClick={closeUser}>
          <Logout />
        </p>
      </div>
    </div>
  );
}

export default DisplayUser;
