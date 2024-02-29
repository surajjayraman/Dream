import React from "react";
import "../styles/ListingCard.scss";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = (props) => {
  // slider for images
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(props.listingPhotoPaths.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === props.listingPhotoPaths.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // add to wish list
  const user = useSelector((state) => state?.user);
  let wishList = useSelector((state) => state?.user?.wishList);
  wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item._id === props.listingId);

  const patchWishList = async (e) => {
    if (user?._id !== props.creator._id) {
      await fetch(`/users/${user?._id}/${props.listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
        .then((res) => res.json()) // parse the response as JSON
        .then((data) => {
          dispatch(setWishList(data.wishList)); // then access the wishList property
        })
        .then(console.error);
    } else {
      return;
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${props.listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {props.listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${photo.replace("public", "")}`}
                alt={`property-pic ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>{`${props.city}, ${props.province}, ${props.country}`}</h3>
      <p>{props.category}</p>

      {!props.booking ? (
        <>
          <p>{props.type}</p>
          <p>
            <span>${props.price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {props.startDate} - {props.endDate}
          </p>
          <p>
            <span>${props.totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList(e);
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
