import React, { useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { useState } from "react";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchListings = async () => {
      try {
        const response = await fetch(
          `https://dream-api-seven.vercel.app/properties/search/${search}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (error) {
        console.log("Fetch search listings failed:", error.message);
      }
    };
    getSearchListings();
  }, [dispatch, search]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <Navbar />
        <h1 className="title-list">{search}</h1>
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
        </div>
        <Footer />
    </>
  );
};

export default SearchPage;
