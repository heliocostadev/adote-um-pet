import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/LOGO.png";

/* contexts */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to="/">
          <img src={Logo} alt="Get A Pet" />
        </Link>
      </div>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link className={styles.navbar_links} to="/pet/myadoptions">
                adoções
              </Link>
            </li>
            <li>
              <Link className={styles.navbar_links} to="/pet/mypets">
                pets
              </Link>
            </li>
            <li>
              <Link className={styles.navbar_links} to="/user/profile">
                perfil
              </Link>
            </li>
            <li onClick={logout}>
              <p className={styles.navbar_links}>sair</p>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className={styles.navbar_links} to="/login">
                entrar
              </Link>
            </li>
            <li>
              <Link className={styles.navbar_links} to="/register">
                registar
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
