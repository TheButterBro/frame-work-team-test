import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import Header from "./Components/Header/Header";
import Filters from "./Components/Filters/Filters";
import Paintings from "./Components/Paintings/Paintings";

export const FilterContext = createContext({});

function App() {
  const [paintings, setPaintings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);

  const [theme, setTheme] = useState("light");

  const [filterName, setFilterName] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    async function getFetch() {
      await axios
        .get("https://test-front.framework.team/authors")
        .then((res) => {
          setAuthors(res.data);
        });
      await axios
        .get("https://test-front.framework.team/locations")
        .then((res) => {
          setLocations(res.data);
        });
      await axios
        .get("https://test-front.framework.team/paintings?_page=1&_limit=12")
        .then((res) => {
          setPaintings(res.data);
        });
    }
    getFetch();
  }, []);

  useEffect(() => {
    console.log(filterName, filterAuthor, filterLocation, filterDate);
  }, [filterName, filterAuthor, filterLocation, filterDate]);

  const getThemeValue = (value) => {
    setTheme(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header getThemeValue={getThemeValue} />
        <FilterContext.Provider
          value={{
            filterName,
            setFilterName,
            filterAuthor,
            setFilterAuthor,
            filterLocation,
            setFilterLocation,
            filterDate,
            setFilterDate,
          }}
        >
          <Filters theme={theme} authors={authors} locations={locations} />
          <Paintings
            theme={theme}
            paintings={paintings}
            authors={authors}
            locations={locations}
          />
        </FilterContext.Provider>
      </div>
    </div>
  );
}

export default App;
