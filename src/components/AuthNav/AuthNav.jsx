import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
};

export default AuthNav;
