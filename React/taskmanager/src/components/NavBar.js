import React from "react";

const NavBar = () => {

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.setIremoveItemtem("refresh_token");
};

  return (
        <nav class="navbar navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand">HBS</a>
                <button class="btn btn-outline-light" type="button" onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </nav>
  );
};

export default NavBar;
