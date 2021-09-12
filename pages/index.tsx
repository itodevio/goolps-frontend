import React from "react";
import Head from "next/head";
import { Tabs, Tab } from "grommet";
import styles from "./index.module.scss";
import NewProduct from "components/NewProduct/NewProduct";

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Goolps - Produtos</title>
      </Head>

      <Tabs>
        <Tab title="PRODUTO">
          <div className={styles.container}>
            <h1 style={{ fontSize: "2rem", margin: "3rem 0", fontWeight: 500 }}>Novo Produto</h1>
            <NewProduct
              ingredients={[
                {
                  _id: "sdoifjhg098dsfh9",
                  name: "Cebola",
                  description: "aa",
                  lotNumber: 1213,
                  qtt: 10,
                  unit: "g",
                },
              ]}
            />
          </div>
        </Tab>
        <Tab title="INGREDIENTE"></Tab>
      </Tabs>
    </div>
  );
};

export default IndexPage;
