import React from "react";
import Appbar from "./Appbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Appbar />
      <div className="pt-14">{children}</div>
    </>
  );
}

export default Layout;
