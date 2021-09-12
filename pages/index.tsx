import React from "react";
import Head from "next/head";
import Orders from "pages/orders";

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Goolps - Produtos</title>
      </Head>

      <Orders />
    </div>
  );
};

export default IndexPage;
