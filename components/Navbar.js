import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/Navbar.module.scss";
import { GrActions } from "react-icons/gr";

const Navbar = () => {
  const router = useRouter();
  return (
    <div id="navbarOuterWrapper" className={style.navbarOuterWrapper}>
      <div className={style.navbarInnerWrapper}>
        <ul className={style.navbarUL}>
          <li
            className={
              router.route === "/menu"
                ? `${style.navbarLI} ${style.activeNavLink}`
                : `${style.navbarLI}`
            }
          >
            <Link href="/menu">Menu</Link>
            <div className={style.borderDiv}></div>
          </li>
          <li
            className={
              router.route === "/order"
                ? `${style.navbarLI} ${style.activeNavLink}`
                : `${style.navbarLI}`
            }
          >
            <Link href="/order">Order</Link>
            <div className={style.borderDiv}></div>
          </li>
          <li className={style.navbarIconLI}>
            <Link href="/">
              <span>
                Restaurant
                <GrActions
                  style={{
                    height: "16px",
                    width: "auto",
                    transform: "translateY(10px)",
                  }}
                />
                MKE
              </span>
            </Link>
          </li>
          <li
            className={
              router.route === "/locations"
                ? `${style.navbarLI} ${style.activeNavLink}`
                : `${style.navbarLI}`
            }
          >
            <Link href="/locations">Locations</Link>
            <div className={style.borderDiv}></div>
          </li>
          <li
            className={
              router.route === "/contact"
                ? `${style.navbarLI} ${style.activeNavLink}`
                : `${style.navbarLI}`
            }
          >
            <Link href="/contact">Contact</Link>
            <div className={style.borderDiv}></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
