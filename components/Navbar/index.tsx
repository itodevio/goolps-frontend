import React from "react";
import { Anchor, Nav } from "grommet";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <Nav direction="row" background="white" pad="medium">
        <Anchor>Ingredientes</Anchor>
        <Anchor>Produtos</Anchor>
        <Anchor>Pedidos</Anchor>
      </Nav>
    </div>
  );
};

export default Navbar;
