import React, { useState, useContext } from "react";
import { useEffect } from "react";

import { FilterContext } from "../../App";
import styles from "./MySelectDate.module.scss";

function MySelectDate({ theme }) {
  const { setFilterDate } = useContext(FilterContext);

  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState("Created");
  const [from, setFrom] = useState("");
  const [before, setBefore] = useState("");

  useEffect(() => {
    if (from === "" && before !== "") {
      return setFilterDate(`created_lte=${before}`);
    }
    if (before === "" && from !== "") {
      return setFilterDate(`created_gte=${from}`);
    }
  }, [from, before, setFilterDate]);

  const handleFrom = (e) => {
    setFrom(e.target.value);
    if (before === "") {
      setValue(`From ${e.target.value}`);
      setFilterDate(`created_gte=${from}`);
    } else {
      setValue(`From ${e.target.value} to ${before}`);
      setFilterDate(`created_gte=${from}&created_lte=${before}`);
    }
  };

  const handleBefore = (e) => {
    setBefore(e.target.value);
    if (from === "") {
      setValue(`Before ${e.target.value}`);
      setFilterDate(`created_lte=${before}`);
    } else {
      setValue(`From ${from} to ${e.target.value}`);
      setFilterDate(`created_gte=${from}&created_lte=${before}`);
    }
  };
  const handleClearValue = () => {
    setValue("Created");
    setFilterDate("");
    setBefore("");
    setFrom("");
  };
  const handleIsOpened = (e) => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={
          isOpened ? styles.select : `${styles.closed} ${styles.select}`
        }
      >
        <p>{value}</p>
        <div className={styles.buttons}>
          {from && before === "" ? (
            <img
              onClick={handleClearValue}
              className={styles.clear}
              src="images/icon_select_clear.svg"
              alt="Очистить фильтр"
            />
          ) : (
            <></>
          )}
          {theme === "light" ? (
            <img
              className={styles.appear}
              src="images/icon_select.svg"
              alt="Открыть фильтр"
              onClick={handleIsOpened}
            />
          ) : (
            <img
              className={styles.appear}
              src="images/icon_select_light.svg"
              alt="Открыть фильтр"
              onClick={handleIsOpened}
            />
          )}
        </div>
      </div>
      {isOpened ? (
        <div className={styles.body}>
          <div className={styles.row}>
            <input
              value={from}
              onChange={handleFrom}
              type="number"
              placeholder="from"
              className={styles.first}
            />
            <div className={styles.spliter} />
            <input
              value={before}
              onChange={handleBefore}
              type="number"
              placeholder="before"
              className={styles.second}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MySelectDate;
