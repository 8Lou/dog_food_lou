import React, { useContext, useEffect, useState } from "react";
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
import { Select } from "antd";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { getEndings } from "../../utils/utils";

/* функция отображения лексики русского языка */
export const CatalogPage = () => {
  /*   const getIssues = (numb) => {
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
  }; */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  /* пагинация */
  const optionsSize = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  const optionsPage = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
  ];

  const handleChangeSize = (e) => {
    setPageSize(e);
  };
  const handleChangePage = (e) => {
    setPage(e);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //     navigate({
  //         pathname: '/', search: createSearchParams({
  //             page: page,
  //             pageSize
  //         }).toString()
  //     })
  // }, [navigate, page, pageSize])

  useEffect(() => {}, [page, pageSize]);

  return (
    <>
            {search && <p className='search'> По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'}  {cards.length}{getEndings(cards.length)}</p>}
            <div className='sort-cards'>
                {sortedItems.map(e =>
                    <span className='sort-item' key={e.id} onClick={() => onSort(e.id)}>{e.id}</span>
                )}
            </div>
            <CardList cards={cards} />

      <div>
        {/* пагинация */}
                <span>
                    size page
                </span>
                <Select defaultValue={10} style={{ width: 120 }} onChange={handleChangeSize} options={optionsSize} />
            </div>
            <div>
                <span>
                    number page
                </span>
                <Select defaultValue={1} style={{ width: 120 }} onChange={handleChangePage} options={optionsPage} />
            </div>
        </>
    )
}
