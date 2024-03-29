import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="bg-zinc-200 h-screen ">
      <div className="flex-col">
        <header className="">
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
