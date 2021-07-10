import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles, { globalStyle } from "./styles";
import Link from "next/link";

const maxCatShow = 3;

const PopularListCategoryIndivs = ({ categories = [] }) => {
  const [selectArr, setSelectArr] = useState([]);
  const [catsShow, setCatsShow] = useState([]);

  useEffect(() => {
    if (categories) {
      setSelectArr(Array(maxCatShow).fill(false));
    }
  }, [categories]);

  useEffect(() => {
    if (categories) {
      const allCat = categories;
      const catsWillShow = [];
      for (let i = 0; i < maxCatShow; ++i) {
        const randomCat = allCat[Math.floor(Math.random() * allCat.length)];
        if (!catsWillShow.includes(randomCat)) {
          catsWillShow.push(randomCat);
        } else {
          --i;
        }
      }

      setCatsShow(catsWillShow);
    }
  }, [categories]);

  const onChangeSelectdiv = (index) => {
    const newSelectArr = Array(maxCatShow).fill(false);
    newSelectArr[index] = true;
    setSelectArr(newSelectArr);
  };

  return (
    <div className={"list-category-popular"}>
      <h2 className={"header-title"}>divs nhiều confession nhất</h2>
      {catsShow.map((cat, index) => (
        <div
          selected={selectArr[index]}
          onChange={() => onChangeSelectdiv(index)}
          className={"cat-div"}
          key={cat.id}
        >
          <Link
            href={`/category?slug=${cat.slug}`}
            as={`/category/${cat.slug}/`}
          >
            <a>{`#${cat.name}`}</a>
          </Link>
        </div>
      ))}
      <div
        selected={false}
        className={"cat-div"}
        style={{ backgroundColor: "antiquewhite" }}
      >
        <a href={`#category-divs`}>Xem thêm</a>
      </div>

      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyle}
      </style>
    </div>
  );
};

PopularListCategoryIndivs.propTypes = {};

export default PopularListCategoryIndivs;
