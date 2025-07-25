import styles from "./CountryList.module.css";
import Spinner from "../spinner/Spinner.jsx";
import Message from "../Message/Message.jsx";
import CountryItem from "../country/CountryItem.jsx";
import { useCities } from "../../contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },

    []
  );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
