import React from "react";

import "./home.scss";
import Top from "@renderer/components/home/topSection/Top";
import Listing from "@renderer/components/home/listingSection/Listing";
import Activity from "@renderer/components/home/activitySection/Activity";

const Home = (): React.JSX.Element => {
  return (
    <div className="mainContent">
      <Top />{" "}
      <div className="bottom flex">
        <Listing />
        <Activity />
      </div>
    </div>
  );
};

export default Home;
