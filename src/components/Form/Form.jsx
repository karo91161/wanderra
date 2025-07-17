import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from ".././Message/Message.jsx";
import Spinner from "../spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");
  const { createCity, isLoading } = useCities();

  useEffect(
    function () {
      if (!lat && !lng) {
        return;
      }

      async function fetchCityData() {
        try {
          setIsLoadingGeocode(true);
          setError("");
          const response = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          if (!data.countryCode) {
            throw new Error(
              "It doesn't seem to be a city. Please click somewhere else"
            );
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingGeocode(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocode) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (error) {
    return <Message message={error} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
