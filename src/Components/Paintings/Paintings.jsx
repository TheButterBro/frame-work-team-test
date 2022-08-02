import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { FilterContext } from "../../App";
import Painting from "../Painting/Painting";
import styles from "./Paintings.module.scss";
import Pagination from "../Pagination/Pagination";

function Paintings({ paintings, authors, locations, theme }) {
  const [sorted, setSorted] = useState([...paintings]);
  const [currentPage, setCurrentPage] = useState(1);
  const { filterName, filterAuthor, filterLocation, filterDate } =
    useContext(FilterContext);

  const getCurrentPage = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (filterName || filterAuthor || filterLocation || filterDate !== "") {
      if (!sorted.length) {
        setCurrentPage(1);
      }
      axios
        .get(
          `https://test-front.framework.team/paintings?${filterName}${filterAuthor}${filterLocation}${filterDate}&_page=${currentPage}&_limit=12`
        )
        .then((res) => {
          setSorted(res.data);
          if (!res.data.length) {
            setCurrentPage(1);
          }
        });
      return;
    }
    if (currentPage !== 1) {
      axios
        .get(
          `https://test-front.framework.team/paintings?_page=${currentPage}&_limit=12`
        )
        .then((res) => setSorted(res.data));
      return;
    } else {
      setSorted([...paintings]);
      return;
    }
  }, [
    filterName,
    filterAuthor,
    filterLocation,
    filterDate,
    currentPage,
    paintings,
    sorted.length,
  ]);

  return (
    <>
      <div className={styles.body}>
        {sorted.length ? (
          sorted.map((item) => (
            <Painting
              item={item}
              authors={authors}
              locations={locations}
              key={`Картина #${item.id}}`}
            />
          ))
        ) : (
          <h2>Ничего не найдено</h2>
        )}
      </div>
      <Pagination
        theme={theme}
        getCurrentPage={getCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Paintings;
