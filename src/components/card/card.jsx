import React from "react";
import './index.css'

import { ReactComponent as like } from "./img/like.svg";

export const Card = (props) => { //деструктуризация
    console.log(props);
    const product = props.product; /* выловить, достать */
    console.log('product', product);

    /* export const Card = ({product}) => {  *///деструктуризация короткая запись

    /* данный шаблон можно переиспользовать, подставляя {} другие данные из БД */
    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                {/* условный тернанрный рендеринг для случая, когда -0% - не показывать */}
                {!!product.discount && <span className="card__discount">
                    -{product.discount}% {/* -15% */}
                </span>}
                {/* <div className={`tag_type_${new}`}></div> теги */}
            </div>
            <div className="card__sticky card__sticky_type_top-right"><like /></div>
            <a href="/" className="card__link">
                <img src={product.picture ?? product.image} alt="food" className="card__image" /> {/* рендеринг фото из БД */}
                <div className="card__desc">
                    <span className="card__price">{product.price ?? product.gender}</span>
                    <span className="card__wight">100 гр</span>
                </div>
                <p className="card__name">{product.name}</p> {/* рендеринг списка из базы данных/data */}

            </a>
            <span className="card__card btn btn_primary">В корзину</span>
        </div>
    )

    /* либо все это можно коротко ...спред/рест оператор: */
    /* export const Card = ({ name, price, picture, discount, ...product }) => { */
    /* всю запись return повторить, убрав слово product */
}
