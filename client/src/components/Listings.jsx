import React from "react";
import { categories } from "../data";
import "../styles/Listings.scss";

const Listings = () => {
  return (
    <div className="category-list">
      {categories?.map((category, index) => (
        <div key={index} className="category">
          <div className="category_icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
