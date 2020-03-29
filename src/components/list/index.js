import React from "react";
import Fetcher from "./Fetcher";
import TabsHeader from "../headers/TabsHeader";
import ListPage from "./ListPage";

export default function(props) {
  return (
    <main>
      <TabsHeader title={props.title} />
      <section>
        <Fetcher {...props}>
          <ListPage {...props} />
        </Fetcher>
      </section>
    </main>
  );
}
