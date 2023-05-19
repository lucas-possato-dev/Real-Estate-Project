import { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        (country === "Location (any)" || house.country === country) &&
        (property === "Property type (any)" || house.type === property) &&
        (price === "Price range (any)" ||
          (!isNaN(housePrice) &&
            housePrice >= minPrice &&
            housePrice <= maxPrice))
      ) {
        return house;
      }
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
