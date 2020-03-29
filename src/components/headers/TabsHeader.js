import React from "react";
import HeaderWithAccount from "./HeaderWithAccount";
import Nav from "./Nav";

export default function TabsHeader({ title }) {
  return (
    <>
      <HeaderWithAccount title={title} />
      <Nav />
    </>
  );
}
