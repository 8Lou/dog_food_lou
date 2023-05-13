import React, { useContext } from "react";
import "./index.css";
// import { Logo } from '../logo/logo';
import { ReactComponent as LogoSvg } from "../logo/logo.svg"; /* подключение логотипа svg */
/* тогда в return прописывается: <Logo /> */
/* import styles from './style.module.css' */
import { Search } from "../search/Search";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Basket } from "./img/basket.svg";
import { ReactComponent as Profile } from "./img/profile.svg";
import { ReactComponent as Like } from "../Card/img/like.svg";
import { CardsContext } from "../../context/cardContext";

export const Header = (props) => {
  const setSearchQuery = (path) => {
    // console.log({path});
    props.setSearch(path);
  };

  const location = useLocation();

  const { favorites, setModalActive } = useContext(CardsContext);

  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to={"/"}>
            <LogoSvg className="logo" />
            {/* достать компонент вместо применения img */}
          </Link>
          {/*  <Logo /> */} {/* 1й способ подключить компонент-логотип */}
          {/* <input /> */}
          {location.pathname === "/" && <Search setSearch={setSearchQuery} />}
          {/* сюда передается компонент из search */}
          <div className="header__icons">
            <Link className="header__fav" to={"/favorites"}>
              <Like className="header__like" />
              {!!favorites.length && (
                <span className="header__bubble">{favorites.length}</span>
              )}
              {/* использовать роут */}
            </Link>
            <Basket className="header__icon" />
            <Link to={"/login"} onClick={() => setModalActive(true)}>
              <Profile className="header__icon" />
            </Link>
          </div>
          {/* <div className={s.header__module}></div> */}
        </div>
      </div>
    </div>
  );
};
