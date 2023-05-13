import React, { useContext } from "react";
import { Product } from "../../components/product/Product";
import "./index.css";
import { BackNavigate } from "../../components/backNavigate/BackNavigate";
import { CardList } from "../../components/cardList/CardList";
import { CardsContext } from "../../context/cardContext";

export const FavoritesPage = () => {
  const { favorites } = useContext(CardsContext);
  return (
    <div className="favorites container">
      <BackNavigate />
      <h1 className="favorites__title">Избранное</h1>
      <CardList cards={favorites} />
    </div>
  );
};
