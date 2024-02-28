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
            ? `/properties?category=${selectedCategory}`
            : "/properties",
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

  console.log(`listings: ${JSON.stringify(listings)}`);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`category ${selectedCategory === category.label ? "selected" : ""}`}
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
              booking={listing.booking}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Listings;
