import React from "react";
import './index.css'

import { ReactComponent as Like } from "./img/like.svg";
import { api } from '../../utils/api';

export const Card = (props) => { //деструктуризация
    console.log(props);
    const product = props.product; /* выловить, достать */
    console.log('product', product);
    /* export const Card = ({ name, price, wight, pictures, image, gender, likes, discount, userId, product, handleLike, ...args }) => { // или*/
    /* export const Card = ({product}) => {  *///деструктуризация короткая запись
    const isLiked = likes.some(e => e === userId);
    const handleClick = () => {
        // isLiked
        //     ? api.deleteLike(product._id).then((data) => console.log(data))
        //     : api.addLike(product._id).then((data) => console.log(data));

        // const response = await api.addLike(product._id);
        // console.log({response});

        handleLike(product, isLiked);

        // const resp = await api.changeProductLike(product._id, isLiked);
        // console.log({ resp })
    }
    // console.log(isLiked);

    /* данный шаблон можно переиспользовать, подставляя {} другие данные из БД */
    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                {/* условный тернанрный рендеринг для случая, когда -0% - не показывать */}
                {!!product.discount && <span className="card__discount">
                    -{product.discount}% {/* -15% */}
                </span>}
                {args.tags.map(e => <span className={`tag tag_type_${e}`} key={e}>{e}</span>)}
                {/* <div className={`tag_type_${new}`}></div> теги */}
            </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}>
                    <Like />
                </button>
                </div>
            <a href="/" className="card__link">
                <img src={product.picture ?? product.image} alt="food" className="card__image" /> {/* рендеринг фото из БД */}
                <div className="card__desc">
                    <span className="card__price">{product.price ?? product.gender} p.</span>
                    <span className="card__wight">{wight}</span>
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
