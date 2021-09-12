import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { Text, Nav } from "grommet";
import GoolpsLogo from "public/goolps-logo.svg";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <Nav direction="row" background="white" pad="medium" align="center">
        <Link href="/">
          <a>
            <Image src={GoolpsLogo} />
          </a>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/ingredients">
            <a>
              <Text color="brand" size="large" weight={500}>Ingredientes</Text>
            </a>
          </Link>
          <Link href="/products">
            <a>
              <Text color="brand" size="large" weight={500}>Produtos</Text>
            </a>
          </Link>
          <Link href="/">
            <a>
              <Text color="brand" size="large" weight={500}>Pedidos</Text>
            </a>
          </Link>
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
