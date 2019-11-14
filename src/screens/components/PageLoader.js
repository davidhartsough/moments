import React from "react";
import Header from "./Header";
import Loader from "./Loader";

export default ({ title }) => (
  <main>
    <Header title={title} />
    <section>
      <Loader />
    </section>
  </main>
);
