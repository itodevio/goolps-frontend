import React from "react";
import Head from "next/head";
import { Tabs, Tab } from "grommet";
import NewProduct from "../components/NewProduct";
import NewProductTab from "components/NewProductTab";

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Goolps - Produtos</title>
      </Head>

      <Tabs>
        <Tab title="PRODUTO">
          <h1>Novo Produto</h1>
          <NewProduct
            ingredients={[
              {
                _id: "sdoifjhg098dsfh9",
                name: "Cebola",
                qtt: 1,
                description: "aaa",
                lotNumber: 123,
                unit: "kg",
              },
            ]}
          />
        </Tab>
        <Tab title="INGREDIENTE">
          <NewProductTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default IndexPage;
