import React from "react";
import "../styles/WishList.scss";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  const wishList = useSelector((state) => state?.user?.wishList);
  const [loading, setLoading] = useState(true);
  return loading ? (
    <Loader />
  ) : (
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
                creator={creator._id}
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
