import React from "react";
import { Card } from "./card/Card";
/* создать стили card_list для и импортировать: */
import "./index.css";

/* РЕНДЕРИНГ КАРТОЧЕК */
/* export const CardList = ({ cards, userId, handleLike }) => { */ //деструктуризация. Компонент получает данные
export const CardList = ({ cards }) => {
  return (
    <div className="cards">
      {cards.map((item) => {
        return (
          <Card
            key={item.updated_at}
            {...item}
            product={item} /* userId={userId} handleLike={handleLike} */
          />
        ); //передать product в card/деструктуризация
      })}
    </div>
  );
};
