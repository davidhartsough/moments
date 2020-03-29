import React from "react";
import HeaderWithClose from "../headers/HeaderWithClose";
import Loader from "./Loader";

export default ({ title }) => (
  <main>
    <HeaderWithClose title={title} />
    <section>
      <Loader />
    </section>
  </main>
);
