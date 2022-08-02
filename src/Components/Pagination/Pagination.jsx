import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";

function Pagination({ getCurrentPage, currentPage, theme }) {
  const pages = [1, 2, 3];
  const [thisCurrentPage, setThisCurrentPage] = useState(1);

  useEffect(() => {
    setThisCurrentPage(currentPage);
  }, [currentPage]);

  const sendCurrentPage = (value) => {
    setThisCurrentPage(value);
    getCurrentPage(value);
  };

  return (
    <div className={styles.body}>
      <button
        onClick={() => sendCurrentPage(1)}
        type="button"
        disabled={thisCurrentPage === 1}
        className={styles.item}
      >
        <img
          className={styles.mirror}
          src={
            theme === "light"
              ? "images/double_next.svg"
              : "images/double_next_light.svg"
          }
          alt="К началу списка"
        />
      </button>
      <button
        onClick={() => sendCurrentPage(thisCurrentPage - 1)}
        type="button"
        disabled={thisCurrentPage === 1}
        className={styles.item}
      >
        <img
          className={styles.mirror}
          src={theme === "light" ? "images/next.svg" : "images/next_light.svg"}
          alt="Предыдущая страница"
        />
      </button>
      {pages.map((item) => (
        <button
          type="button"
          onClick={() => sendCurrentPage(item)}
          key={item}
          className={item === thisCurrentPage ? styles.itemActive : styles.item}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => sendCurrentPage(thisCurrentPage + 1)}
        type="button"
        disabled={thisCurrentPage === pages.length}
        className={styles.item}
      >
        <img
          src={theme === "light" ? "images/next.svg" : "images/next_light.svg"}
          alt="Следующая страница"
        />
      </button>
      <button
        onClick={() => sendCurrentPage(pages.length)}
        type="button"
        disabled={thisCurrentPage === pages.length}
        className={styles.item}
      >
        <img
          src={
            theme === "light"
              ? "images/double_next.svg"
              : "images/double_next_light.svg"
          }
          alt="К концу списка"
        />
      </button>
    </div>
  );
}

export default Pagination;
