import React, { useContext } from "react";
import "./index.scss";

import { ReactComponent as Like } from "./img/like.svg";
import { api } from "../../utils/api";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardsContext } from "../../context/cardContext";
import { ThemeContext } from "../../context/themeContext";

/* export const Card = (props) => {  */ //деструктуризация
export const Card = ({
  name,
  price,
  wight,
  pictures,
  image,
  gender,
  likes,
  discount,
  /* userId, */
  product,
  ...args
}) => {
  const user = useContext(UserContext);
  const { handleLike } = useContext(CardsContext);

  /*console.log(props);
          const product = props.product; /* выловить, достать */
  /* console.log('product', product); */
  /* export const Card = ({ name, price, wight, pictures, image, gender, likes, discount, userId, product, handleLike, ...args }) => { // или*/
  /* export const Card = ({product}) => {  */ //деструктуризация короткая запись

  const handleClick = () => {
    // если лайк стоит, удалить при нажатии. И наоборот
    // isLiked
    //     ? api.deleteLike(product._id).then((data) => console.log(data))
    //     : api.addLike(product._id).then((data) => console.log(data));
    // ИЛИ (покороче) :
    // const response = await api.addLike(product._id);
    // console.log({response});

    // теперь нужно избавиться от необходимости перезагрузить стр для результата лайка

    // функция управления апи-запросом

    handleLike(product, isLiked);

    // const resp = await api.changeProductLike(product._id, isLiked);
    // console.log({ resp })

    /* setIsProductLiked(!isLikedProduct) оптимистичный прогноз - твердое решение неждать запрос*/
  };

  // console.log(isLiked);

  const theme = useContext(ThemeContext); /* смена темы */

  const isLiked = likes.some((e) => e === user._id);

  /* данный шаблон можно переиспользовать, подставляя {} другие данные из БД */

  return (
    <div className={` card card__${theme ? "light" : "dark"} `}>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className="card__discount">-{discount}%</span>}
        {args.tags.map(e => <span className={`tag tag_type_${e}`} key={e}>
            {e}</span>)}
      </div>
      <div className="card__sticky card__sticky_type_top-right">

        <button
          onClick={handleClick}
          className={`card__favorite ${isLiked ? "card__favorite_active" : ""}`}>
          <Like />
        </button>
        
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures ?? image} alt="food" className="card__image" />
        <div className="card__desc">
          <span className="card__price">{price}p</span>
          <span className="card__weight">{wight}</span>
        </div>
        <p className="card__name">{name}</p>
      </Link>
      {/* <NavLink  ></NavLink> */}
      <span className="card__card btn btn_type_primary">В Корзину</span>
    </div>
  );

  /* либо все это можно коротко ...спред/рест оператор: */
  /* export const Card = ({ name, price, picture, discount, ...product }) => { */
  /* всю запись return повторить, убрав слово product */
};

/*условный тернанрный рендеринг для случая, когда -0% - не показывать
реактивность лайков при нажатии */
/* скидки, дискаунд */
/* <div className={`tag_type_${new}`}></div> теги */

/* ссылки а заменены на линк
/* <a href="/" className="card__link"> */
/* рендеринг списка из базы данных/data */
/* </a> */
