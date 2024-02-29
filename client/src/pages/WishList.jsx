import React from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  const wishList = useSelector((state) => state?.user?.wishList);
  return (
    <>
      <div>
        <Navbar />
        <h1 className="title-list">Your Wish list</h1>
        <div className="list">
          {wishList?.map(
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
    </>
  );
};

export default WishList;
