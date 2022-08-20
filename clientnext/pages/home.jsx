import React from "react";
import { gql } from "@apollo/client";
import client from "../components/apollo-client";


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        templates {
          id
          name
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
 };
}

const home = (props) => {
  console.log(props);

  return <div>
   data
  </div>;
};

export default home;
