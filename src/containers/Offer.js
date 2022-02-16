import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    <>
      <div className="offer_page">
        <p className="price">{data.product_price} €</p>
        <p className="name_pdt">{data.product_name}</p>

        {data.product_details.map((item, index) => {
          const keys = Object.keys(item);
          return (
            <p key={index}>
              {keys[0]} {item[keys[0]]}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Offer;
