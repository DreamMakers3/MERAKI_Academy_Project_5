import React, { useEffect } from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";
import HomeRight from "./HomeRight";
import axios from "axios";
import { useSelector } from "react-redux";

function Home() {
  const state = useSelector((state) => {
    return {
      userInfo: state.profile.userInfo,
    };
  });

  // ========================================
  return (
    <>
      {state.userInfo.role_id === 2 ? (
        <div className="flex flex-row justify-center space-x-10 mt-5 bg-zinc-200">
          <div className="">
            <HomeSide />
          </div>
          <div className="">
            <HomeMain />
          </div>{" "}
        </div>
      ) : (
        <div className="flex flex-row justify-center space-x-4 mt-5 bg-zinc-200">
          <div className="">
            <HomeSide />
          </div>
          <div className="">
            <HomeMain />
          </div>{" "}
          <div className="">
            <HomeRight />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
