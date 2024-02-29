import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeedListings = async () => {
      try {
        const response = await fetch(`/properties?category=${category}`, {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (error) {
        console.log("Fetch listings failed:", error.message);
      }
    };
    getFeedListings();
  }, [dispatch, category]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            price,
            creator,
            type,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              price={price}
              type={type}
              booking={booking}
            />
          )
        )}
      </div>
    </>
  );
};

export default CategoryPage;
