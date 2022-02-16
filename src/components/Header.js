import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted_logo.png";
// import "../App.css";

const Header = ({ setUser, token }) => {
  const navigate = useNavigate();

  return token ? (
    // Boutton se déconnecter
    <button
      className="deconnexion"
      onClick={() => {
        // setUser(null) => active la fonction setUser App.js si tokenToSet est null : condition else => va afficher Se connecter ou s'inscrire

        setUser(null);
        navigate("/");
      }}
    >
      Se déconnecter
    </button>
  ) : (
    <div className="header">
      {/* Click logo => go to homepage */}
      <Link to="/">
        <img className="logo" src={logo} alt="logo_vinted" />
      </Link>

      <input
        className="search_bar"
        type="text"
        placeholder="Rechercher des articles"
      />
      <Link to="/signup">
        <button className="inscrire">S'inscrire</button>
      </Link>
      <Link to="/login">
        <button className="login">Se connecter</button>
      </Link>
      <Link to="/">
        <button className="sell">Vends maintenant</button>
      </Link>
    </div>
  );
};

export default Header;
