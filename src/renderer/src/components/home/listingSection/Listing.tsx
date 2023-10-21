import React from "react";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import "./listing.scss";

import pet1 from "../../../assets/images/pet1.png";
import pet2 from "../../../assets/images/pet2.png";
import pet3 from "../../../assets/images/pet3.png";
import pet4 from "../../../assets/images/pet4.png";

import user1 from "../../../assets/images/user1.png";
import user2 from "../../../assets/images/user2.png";
import user3 from "../../../assets/images/user3.png";
import user4 from "../../../assets/images/user4.png";

const Listing = (): React.JSX.Element => {
  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1>My listings</h1>
        <button className="btn flex">
          See all <ArrowRightAltOutlinedIcon className="icon" />
        </button>
      </div>

      <div className="secContainer flex">
        <div className="singleItem">
          <FavoriteOutlinedIcon className="icon" />
          <img src={pet1} alt="Image Name" />
          <h3>Annual Vince</h3>
        </div>

        <div className="singleItem">
          <FavoriteBorderOutlinedIcon className="icon" />
          <img src={pet2} alt="Image Name" />
          <h3>Annual Vince</h3>
        </div>

        <div className="singleItem">
          <FavoriteBorderOutlinedIcon className="icon" />
          <img src={pet3} alt="Image Name" />
          <h3>Annual Vince</h3>
        </div>

        <div className="singleItem">
          <FavoriteOutlinedIcon className="icon" />
          <img src={pet4} alt="Image Name" />
          <h3>Annual Vince</h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Sellers</h3>
            <button className="btn flex">
              See all <ArrowRightAltOutlinedIcon className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={pet1} alt="Image Name" />
              <img src={pet2} alt="Image Name" />
              <img src={pet3} alt="Image Name" />
              <img src={pet4} alt="Image Name" />
            </div>
            <div className="cardText">
              <span>
                14.556 Plant sold <br />
                <small>
                  21 Sellers <span className="date"> 7 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Sellers</h3>
            <button className="btn flex">
              See all <ArrowRightAltOutlinedIcon className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="Image Name" />
              <img src={user2} alt="Image Name" />
              <img src={user3} alt="Image Name" />
              <img src={user4} alt="Image Name" />
            </div>
            <div className="cardText">
              <span>
                20.556 Plant sold <br />
                <small>
                  27 Sellers <span className="date"> 31 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
