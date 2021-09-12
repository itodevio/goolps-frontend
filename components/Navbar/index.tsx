import React from "react";
import Image from "next/image";
import { Anchor, Nav } from "grommet";
import GoolpsLogo from "public/goolps-logo.svg";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <Nav direction="row" background="white" pad="medium">
        <Image src={GoolpsLogo} />
        <div className="flex gap-4 items-center">
          <Anchor href="ingredients">Ingredientes</Anchor>
          <Anchor href="products">Produtos</Anchor>
          <Anchor href="orders">Pedidos</Anchor>
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
