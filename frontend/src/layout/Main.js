import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className="flex-col">
        <header>
          <NavBar />
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
