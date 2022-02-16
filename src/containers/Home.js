import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import front from "../assets/img/front.png";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Chargement...</span>
  ) : (
    <>
      <div className="front_img">
        <img className="front" src={front} alt="img" />
      </div>{" "}
      <h1>Articles populaires</h1>
      <div className="elements_home">
        {data.offers.map((offer, index) => {
          return (
            // style pour le link
            <div className="elems">
              <Link to={`/offer/${offer._id}`} key={offer._id}>
                {/* Avatar au dessus des img */}

                <img
                  className="avatar"
                  src={offer.owner.account.avatar?.secure_url}
                  alt="avatar"
                />
                {/* Nom des produits dans la page Home */}
                <img
                  className="img_home"
                  src={offer.product_image.secure_url}
                  alt="picture-product"
                />
              </Link>
              <h2>{offer.product_price}€</h2>
              <h3>{offer.product_description}</h3>
              <h3>{offer.product_name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Home;
