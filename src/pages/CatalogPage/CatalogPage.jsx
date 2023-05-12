import React, { useContext } from "react";
import { CardList } from "../../components/cardList/CardList";
import "./index.css";
import { CardsContext } from "../../context/cardContext";
import {
  CHEAPEST,
  EXPENSIVE,
  NEWEST,
  POPULAR,
  RATE,
  SALE,
} from "../../constants/constants";

/* функция отображения лексики русского языка */
export const CatalogPage = () => {
  const getIssues = (numb) => {
    const tmp = numb % 10;
    if (!tmp || !numb) {
      return " товаров";
    }
    if (tmp === 1) {
      return " товар";
    }
    if (tmp > 1 && tmp < 5) {
      return " товара";
    }
  };

  const { cards, onSort, search } = useContext(CardsContext);
  /* сортировка с переводом*/
  const sortedItems = [
    { id: POPULAR, title: "Популярные" },
    { id: NEWEST },
    { id: CHEAPEST },
    { id: RATE },
    { id: EXPENSIVE },
    { id: SALE },
  ];

  return (
    <>
      {search && (
        <p className="search">
          {" "}
          По запросу <b>{search}</b> {cards.length === 1 ? "найден" : "найдено"}{" "}
          {cards.length}
          {getIssues(cards.length)}
        </p>
      )}
      {/* сортировка при выборке */}
      <div className="sort-cards">
        {sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      <CardList cards={cards} />
    </>
  );
};
