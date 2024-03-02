import React, { useEffect } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  useEffect(() => {
    const getFeedListings = async () => {
      try {
        const response = await fetch(
          selectedCategory !== "All"
            ? `https://dream-api-seven.vercel.app/properties?category=${selectedCategory}`
            : "https://dream-api-seven.vercel.app/properties",
          { method: "GET" }
        );
        const data = await response.json();
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (error) {
        console.log("Fetch listings failed:", error.message);
      }
    };
    getFeedListings();
  }, [dispatch, selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`category ${
              selectedCategory === category.label ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard
              listingId={listing._id}
              creator={listing.creator}
              listingPhotoPaths={listing.listingPhotoPaths}
              city={listing.city}
              province={listing.province}
              country={listing.country}
              category={listing.category}
              type={listing.type}
              price={listing.price}
              booking={false}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Listings;
