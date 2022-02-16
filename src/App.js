import "./reset.css";
import "./App.css";
import "./index.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Cookies from "js-cookie";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Menu from "./components/Menu";
import Publish from "./containers/Publish";

function App() {
  // T O K E N   -   get, set, remove
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      // Initialisation du cookie :
      Cookies.set("userToken", token, { expires: 5 });
      // lors de la déconnexion :
    } else {
      Cookies.remove("userToken");
    }
    // Set the token
    setToken(token);
  };

  return (
    // setUser : Header, Signup, Login  - token ?
    // placer menu femmes,hommes, enfants dans composant
    <Router>
      <Header setUser={setUser} token={token} />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
