import React from "react";
import Header from "../components/Header";

const Layout = ({ component }) => {
  return (
    <div>
      <Header />
      {component}
    </div>
  );
};

export default Layout;
