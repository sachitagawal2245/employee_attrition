import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Attrition AI</Link>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>

        <a href="#about" onClick={scrollToSection("about")}>
          About
        </a>

        <a href="#contact" onClick={scrollToSection("contact")}>
          Contact
        </a>

        <NavLink
          to="/predict"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Predict
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;