import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // fonction déclenchée dans mon form doit avoir event   -   évite de refresh page
    event.preventDefault();
    // Requête axios try/catch - API Vinted et données form en post : 2 arguments : lien et objet {}
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          // 2 éléments rentrés par l'user ici
          email: email,
          password: password,
        }
      );
      // Récupération données envoyées ok - id account email token dans console
      console.log(response.data);
      if (response.data.token) {
        // Token est sauvegardé dans un cookie - cookie créé
        setUser(response.data.token);
        // user redirigé vers la homepage
        navigate("/");
      } else {
        alert("Oops ! Une erreur est survenue");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Email et mot de passe incorrects");
      }
    }
  };
  return (
    <div className="login_form">
      Se connecter
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="Se connecter" />
        <br />
        {/* Email et mot de passe incorrects */}
        <span>{errormessage}</span>
        <Link className="no_count" to="/signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </div>
  );
};
export default Login;
