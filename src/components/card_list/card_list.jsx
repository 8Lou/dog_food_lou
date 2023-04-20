import React from "react";
import { Card } from './card/card.jsx'
/* создать стили card_list для и импортировать: */
import './index.css'

/* РЕНДЕРИНГ КАРТОЧЕК */
export const CardList = ({ cards }) => { //деструктуризация. Компонент получает данные

    
    return (
        <div className="cards">
            {cards.map((item) => {
                return <Card key={item.name} {...item} product={item} />; //передать product в card/деструктуризация
            })}


        </div>
    );
};