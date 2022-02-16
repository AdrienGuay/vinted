import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// props setUser - token
const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // fonction déclenchée dans mon form doit avoir event   -   éviter refresh page
    event.preventDefault();
    // Requête axios try/catch - API Vinted et données form - en post : 2 arguments lien, objet {}
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      // Récupération données envoyées ok - id account email token dans console
      console.log(response.data);
      if (response.data.token) {
        // Token est sauvegardé dans un cookie
        setUser(response.data.token);
        // user redirigé vers la homepage
        navigate("/");
      } else {
        alert("Oops ! Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signup_form">
      <p>S'inscrire</p>
      {/* Déclencher onSubmit avec une fonction */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Nom d'utilisateur"
          // Utilisateur puisse rentrer données
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          {/* Mettre en forme checkbox meme ligne text */}
          <input
            type="checkbox"
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}
          />
          <p>S'inscrire à notre newsletter</p>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.{" "}
          </p>
        </div>
        {/* placeholder s'inscrire ? */}
        <input type="submit" placeholder="S'inscrire" value="S'inscrire" />
      </form>
    </div>
  );
};

export default Signup;
