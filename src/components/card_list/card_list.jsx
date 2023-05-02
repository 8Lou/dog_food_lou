import React from "react";
import { Card } from './card/card'
/* создать стили card_list для и импортировать: */
import './index.css'

/* РЕНДЕРИНГ КАРТОЧЕК */
export const CardList = ({ cards, userId, handleLike }) => { //деструктуризация. Компонент получает данные


    return (
        <div className="cards">
            {cards.map((item) => {
                return <Card key={item.updated_at} {...item} product={item} userId={userId} handleLike={handleLike} />; //передать product в card/деструктуризация
            })}
        </div>
    );
};