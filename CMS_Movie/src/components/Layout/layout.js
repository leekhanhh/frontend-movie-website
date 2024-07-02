import React from "react";
import Header from "../common/header/header";
import Footer from "../common/footer/footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[540px]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
