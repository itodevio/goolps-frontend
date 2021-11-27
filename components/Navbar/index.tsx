import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Text, Nav, Button } from "grommet";
import GoolpsLogo from "public/goolps-logo.svg";
import styles from "./navbar.module.scss";
import app from "connection/firebase.connection";
import { AppContext } from "context/app.context";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AppContext);

  const logout = async () => {
    if (window) {
      localStorage.removeItem("user");
      localStorage.removeItem("cred");
      setUser(undefined);
      app
        .auth()
        .signOut()
        .then(() => {
          router.push("/login");
        });
    }
  };

  const translateRole = (role: string) => {
    if (role === "REGISTERED") {
      return "Registrado";
    } else {
      return "Administrador";
    }
  }

  return (
    <div className={styles.navbarContainer}>
      <div>
        <Nav direction="row" background="white" pad="medium" align="center">
          <Link href="/">
            <a>
              <Image src={GoolpsLogo} />
            </a>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/ingredients">
              <a>
                <Text color="brand" size="large" weight={500}>
                  Ingredientes
                </Text>
              </a>
            </Link>
            <Link href="/products">
              <a>
                <Text color="brand" size="large" weight={500}>
                  Produtos
                </Text>
              </a>
            </Link>
            <Link href="/">
              <a>
                <Text color="brand" size="large" weight={500}>
                  Pedidos
                </Text>
              </a>
            </Link>
            {user && user.role === "ADMIN" && (
              <Link href="/users">
                <a>
                  <Text color="brand" size="large" weight={500}>
                    Usuários
                  </Text>
                </a>
              </Link>
            )}
          </div>
        </Nav>
      </div>
      <div className="flex items-center gap-6">
        {user && (
          <div className="text-center">
            <p>{user.firstName}</p>
            <p>{translateRole(user.role)}</p>
          </div>
        )}
        <Button primary label="Sair" onClick={logout} />
      </div>
    </div>
  );
};

export default Navbar;
