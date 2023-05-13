import React, { useContext, useEffect, useState } from "react";
import s from "./index.module.ыcss";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BackNavigate } from "../backNavigate/BackNavigate";
import { CardsContext } from "../../context/cardContext";
import { getEndings } from "../../utils/utils";
import { BaseButton } from "../Button/Button";
import truck from "./delivery.svg";
import { ReactComponent as Like } from "../Card/img/like.svg";
import cn from "classnames";
import { Modal } from "../Modal/Modal";

const timeOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

export const Product = ({ product, onProductLike }) => {
  const navigate = useNavigate();
  const [isLikedProduct, setIsProductLike] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { productRating, user, handleLike } = useContext(CardsContext);

  const goBack = () => {
    // navigate(-2);
    // navigate(`/product/${product._id}`);
    navigate("/");
    // window.history
  };
  /* console.log({ product }); */

  const location = useLocation();

  const getDiscountPrice = (discount, price) => {
    return (price - Math.floor((price * discount) / 100)).toFixed(0);
  };

  useEffect(() => {
    const isLiked = product.likes.some((e) => e === user?._id);
    setIsProductLike(isLiked);
  }, [product.likes, user]);

  const handleClick = () => {
    onProductLike(product, isLikedProduct);
    // setIsProductLike(!isLikedProduct);
  };

  const handleSubmit = () => {};

  /* console.log({ showForm }); */

  return (
    <div className={`${s.product} container`}>
      <div className={s.titleWrapper}>
        <BackNavigate />

        <span className={s.productTitle}>{product.name}</span>
        <div className={s.rating}>
          <span>Artikul </span>
          <span>XXXXX</span>
        </div>
      </div>

      <div className={s.productInfo}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt="" />
        </div>
        <div className={s.desc}>
          <span
            className={`${s.price} ${!!product.discount ? s.oldPrice : ""}`}
          >
            {product.price}&nbsp;p
          </span>
          {!!product.discount && (
            <span
              className={`${s.price} ${!!product.discount ? s.newPrice : ""}`}
            >
              {getDiscountPrice(product.discount, product.price)}&nbsp;p
            </span>
          )}

          <div className={s.controls}>
            <div className={s.controls__cart__left}>
              <span className={s.controls__minus}>-</span>
              <span className={s.controls__cart__num}>0</span>
              <span className={s.controls__plus}>+</span>
            </div>
            <BaseButton>В корзину</BaseButton>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
            onClick={handleClick}
          >
            <Like />
            <span>{isLikedProduct ? "В избранном" : "В избранное"}</span>
          </button>

          <div className={s.delivery}>
            <img src={truck} alt="truck" className="" />
            <div>
              <span className={s.desc}>Доставка по всему Миру!</span>
              <p className={s.text}>Доставка курьером — от 399 ₽</p>
              <p className={s.text}>Доставка курьером — от 399 ₽</p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.desc}>
        <span className={s.price}>Описание</span>
        <span>{product.description}</span>
      </div>
      <div className={s.desc}>
        <span className={s.price}>Характеристики</span>
        <span>{product.description}</span>
      </div>

      <div className={s.reviews}>
        <span className={s.price}>Отзывы</span>
        <BaseButton onClick={() => setShowForm(true)}>
          Оставить отзыв
        </BaseButton>

        {/* <Modal modalActive={showForm} setModalActive={() => setShowForm(false)}>
                    <form className="form-example" onSubmit={handleSubmit} >
                        Rate Component
                        <textarea name="reviews" type="text" placeholder="Name" className="form__input" />
                        <button type="submit" >Send</button>
                    </form>
                </Modal> */}
        {showForm && (
          <form className="form-example" onSubmit={handleSubmit}>
            Rate Component
            <textarea
              name="reviews"
              type="text"
              placeholder="Name"
              className="form__input"
            />
            <button type="submit">Send</button>
          </form>
        )}

        <div className={s.reviews__list}>
          <div className={s.reviews__hr} />
          {product.reviews.map((e) => (
            <div key={e._id}>
              {" "}
              <div className={s.reviews__item}>
                <div className={s.reviews__author}>
                  <span> {e.author.name}</span>
                  <span className={s.reviews__date}>
                    {" "}
                    {new Date(e.created_at).toLocaleString(
                      "ru-RU",
                      timeOptions
                    )}
                  </span>
                </div>
                <div className={s.rate}>
                  {new Array(e?.rating ?? 1).fill("X")}
                </div>
                <div className={s.text}>{e.text}</div>
              </div>
              <div className={s.reviews__hr} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/*  <div className={s.desc}>
        <span className={s.price}>{product.price}&nbsp;p</span>
      </div>
      <div className={s.desc}>
        <NavLink
          className={
            (res) => (res.isPending ? "pending" : res.isActive ? s.link : "") //NavLink даёт возм-ть стилизовать link
          }
        >
          <span className={s.price}>Описание</span>
        </NavLink>
        <span>{product.description}</span>
      </div> */
