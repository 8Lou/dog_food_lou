import React from "react";
import './index.css';
import { ReactComponent as LogoSvg } from "../logo/logo.svg"; /* подключение логотипа svg */
/* тогда в return прописывается: <Logo /> */
import s from './style.module.css'
import { Search } from "../search/search";

export const Header = () => {
    return <div className="header">
        <div className="container">
            <div className="header__wrapper">
                <LogoSvg className="logo" /> {/* достать компонент вместо применения img */}
                {/*  <Logo /> */} {/* 1й способ подключить компонент-логотип */}
                {/* <input /> */}
                <Search setSearch={()=>{}} /> {/* сюда передается компонент из search */}
                <div className="header__icons">

                </div>
                <div className={s.header__module}></div>
            </div>
        </div>
    </div>
}