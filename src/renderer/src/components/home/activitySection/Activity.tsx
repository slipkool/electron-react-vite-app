import React from "react";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import "./activity.scss";

import user1 from "../../../assets/images/user1.png";
import user2 from "../../../assets/images/user2.png";
import user3 from "../../../assets/images/user3.png";
import user4 from "../../../assets/images/user4.png";

const Activity = (): React.JSX.Element => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Resent activity</h1>
        <button className="btn flex">
          See all <ArrowRightAltOutlinedIcon className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        <div className="singleCustomer flex">
          <img src={user1} alt="Image Name" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Ordered a new plant</small>
          </div>
          <div className="duration">2 min ago</div>
        </div>

        <div className="singleCustomer flex">
          <img src={user2} alt="Image Name" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Ordered a new plant</small>
          </div>
          <div className="duration">2 min ago</div>
        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Image Name" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Ordered a new plant</small>
          </div>
          <div className="duration">2 min ago</div>
        </div>

        <div className="singleCustomer flex">
          <img src={user4} alt="Image Name" />
          <div className="customerDetails">
            <span className="name">Ola Martha</span>
            <small>Ordered a new plant</small>
          </div>
          <div className="duration">2 min ago</div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
