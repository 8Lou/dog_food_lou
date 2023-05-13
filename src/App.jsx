import React, { useEffect, useState } from "react";
import "./App.css";
import { CardList } from "./components/card_list/CardList";
import { Footer } from "./components/footer/Footer.jsx";
import { Header } from "./components/header/Header.jsx";
/* import data from './components/data/data.json' */

import { api } from "./utils/api";
import { useDebounce } from "./hooks/hooks";
import { Product } from "./components/product/Product";
import { CatalogPage } from "./pages/catalogPage/CatalogPage";
import { ProductPage } from "./pages/productPage/ProductPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "./pages/favoritesPage/FavoritesPage";
import { RouterAuth } from "./router/Router";
import { UserContext } from "./context/userContext";
import { CardsContext } from "./context/cardContext";
import { ThemeContext } from "./context/themeContext";
import { filteredCards, findLiked } from "./utils/utils";
import {
  CHEAPEST,
  EXPENSIVE,
  NEWEST,
  POPULAR,
  RATE,
  SALE,
} from "./constants/constants";
import { AntdPage } from "./pages/AntdPage/AntdPage";
import { Form } from "./components/Form/Form";
import { RegistrationForm } from "./components/Form/RegistrationForm";
import { Modal } from "./components/Modal/Modal";
import { LoginForm } from "./components/Auth/Login/Login";

// const [example, setExample] = useState(); нельзя!

//создание компонентов для переиспользования
function App() {
  // состояние карточек
  /* объявляется хук с первоначальным значением 0 */
  /* const [hook, setHook] = useState(0); */

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = React.useState({});
  const [isAuthorized, setAuth] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    const index = cards.findIndex((e) => e._id === updatedCard?._id);
    if (index !== -1) {
      setCards((state) => [
        ...state.slice(0, index),
        updatedCard,
        ...state.slice(index + 1),
      ]);
    }
    wasLiked
      ? // setFavorites/ delete
        setFavorites((state) => state.filter((f) => f._id !== updatedCard._id))
      : // setFavorites/ add
        setFavorites((state) => [updatedCard, ...state]);

    return wasLiked;
  };

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return res / reviews.length;
  };

  const onSort = (sortId) => {
    switch (sortId) {
      case CHEAPEST:
        return setCards((state) => [
          ...state.sort((a, b) => a.price - b.price),
        ]);
      case EXPENSIVE:
        return setCards((state) => [
          ...state.sort((a, b) => b.price - a.price),
        ]);
      case POPULAR:
        return setCards((state) => [
          ...state.sort((a, b) => b.likes.length - a.likes.length),
        ]);
      case NEWEST:
        return setCards((state) => [
          ...state.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          ),
        ]);
      case SALE:
        return setCards((state) => [
          ...state.sort((a, b) => b.discount - a.discount),
        ]);
      case RATE:
        return setCards((state) => [
          ...state.sort(
            (a, b) => productRating(b.reviews) - productRating(a.reviews)
          ),
        ]);
      default:
        return setCards((state) => [
          ...state.sort((a, b) => a.price - b.price),
        ]);
    }
  };

  /* 2 СОРТИРОВКА старый вариант*/
  /* функция онсорт прописывать до юзэффект */
  /* const onSort = (sortId) => {
     если sortId === CHEAPEST, 
    if (sortId === CHEAPEST) {
      /* отсортировать по возрастанию цены 
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]); ререндерить и вернуть явный новый массив
      return;
    }
    if (sortId === EXPENSIVE) {
      отсортировать по убыванию цены 
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
      return;
    }
    if (sortId === POPULAR) {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
      return;
    }
    if (sortId === NEWEST) {
      const newCards = cards.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCards([...newCards]);
      return;
    }

    if (sortId === SALE) {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
      return;
    }
    if (sortId === RATE) {
      const newCards = cards.sort(
        (a, b) => productRating(b.reviews) - productRating(a.reviews)
      );
      setCards([...newCards]);
      return;
    }
  }; */

  /* const [bigdata, setBigdata] = useState([]); */

  /* const clicker = (e) => { */
  /* console.log(e) */
  /* setHook((state) => state = state + 1) /* Хук видит изменение состояния стэйт - идет обратно перерендерить
} */
  // console.log({search});

  /* useEffect запустился когда вся логика отработала */
  /* если рядом положить массив зависимостей, напр[search], после изменений в нем остработает вложенная функция. Т.е.второй раз */

  /* фильтрация картинок в АПИ по ай ди авторов */
  /*   const filteredCards = (cards) => {
      return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '644573ee3291d790b3073d8d')
    } */

  /* const debounceValueInApp = useDebounce(search) */

  /* const handleProductLike = async (product, isLiked) => {
    const updatedCard = await api.changeProductLike(product._id, isLiked); */

  //на каждый элемент в массиве, если обновлен, то найти и вернуть обновленную карточку, иниче ничего
  /*     const newCards = cards.map(e => e._id === updatedCard._id ? updatedCard : e);
      const index = cards.findIndex(e => e._id === updatedCard._id);
      if (index !== -1) {
        setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index + 1)]) // массив обрезать от 0-индекса, вставить
      } */
  // setCards([...newCards])

  // ИЛИ (но не подходит для оптимизации большого колличества карточек) :
  // const deleteCard = () => {
  //   const newCards = cards.map(e => e._id === updatedCard._id ? updatedCard : e)
  //   setCards([...newCards])
  // }
  // const addCard = () => {

  //   // const newCards = cards.map(e => {
  //   //   if (e._id === updatedCard._id) {
  //   //     return updatedCard
  //   //   }
  //   //   return e
  //   // })
  //   const newCards = cards.map(e => e._id === updatedCard._id ? updatedCard : e)
  //   setCards([...newCards])
  // }
  // isLiked ? deleteCard() : addCard()

  // console.log({ updatedCard });

  useEffect(() => {
    /*if (search === undefined) return;
  api.searchProducts(search)
    .then((data) => setCards(data)) */

    if (debounceValueInApp === undefined) return;
    api
      .searchProducts(debounceValueInApp)
      .then((data) => setCards(filteredCards(data)));
  }, [debounceValueInApp]);

  // Фильтрация по рейтенгу лайков
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, data]) => {
        setUser(userData);
        const filtered = filteredCards(data.products); /* получение товаров */
        setCards(filtered); /* надо получить отлайканные */
        const fav = filtered.filter((e) => findLiked(e, userData._id));
        // const fav = filtered.filter(e => e.likes.some(el => el === userData._id));
        setFavorites(fav);
      }
    );
  }, []);

  /* 3 вэлью для контекста */
  const cardsValue = {
    handleLike: handleProductLike,
    cards: cards,
    search,
    favorites,
    onSort,
    setModalActive,
    productRating,
    user,
  };

  /* если нет поиска, то остановить фильтрацию */
  // const filtered = bigdata.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  // setCards(filtered);
  /* но способ не возвращает все карточки обратно и миллион карточек на стороне пользователя искать неправильно */
  /* }, [search]) */

  // console.log('end of working');

  /* Два юзэффекта не использовать, бесконечный ререндер - закрыть страницу */
  // useEffect(() => {
  //   console.log('2nd useEffect');

  //   setSearch((state) => state + 'a')

  // }, [hook])

  /* Promise.all принимает в себя массив запросов и только тогда позволяет их обработать по указанной очереди.
А такая запись не дает уверенности в нужной очередности: */
  // api.getUserInfo().then(data => setUser(data));
  // api.getUserInfo().then().then(()=> api.getProductList().then())
  /* или */
  // api.getProductList().then(data => setCards(data.products));

  /* console.log({ user }); */

  /*  2 КОНТЕКСТ вставить туда, где нужно увидеть */

  const authRoutes = (
    <>
      <Route
        path="/register"
        element={
          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <RegistrationForm />
          </Modal>
        }
      />
      <Route
        path="/login"
        element={
          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <LoginForm />
          </Modal>
        }
      />
    </>
  );

  return (
    <div className={`app__${theme ? "light" : "dark"} `}>
      {/* смена темы */}
      <ThemeContext.Provider value={theme}>
        <CardsContext.Provider value={cardsValue}>
          <UserContext.Provider value={user}>
            <Header setSearch={setSearch} favorites={favorites}></Header>

            {/* <button onClick={() => setTheme(!theme)}>change theme</button>*/}
            {/* кнопка смены темы */}

            <main className="container content">
              {/* <button id="btn" onClick={clicker}>click me state</button> */}
              {/* <CardList cards={cards} /> */}
              {isAuthorized ? (
                <Routes>
                  <Route path="/" element={<CatalogPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/product/:id" element={<ProductPage />}></Route>
                  {authRoutes}
                  <Route path="/stylebook" element={<AntdPage />} />
                  <Route path="*" element={<div>NOT FOUND 404</div>} />
                </Routes>
              ) : (
                <Navigate to={"/not-found"} />
              )}
            </main>
            <Footer />
          </UserContext.Provider>
        </CardsContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

/* <input onChange={(e) => console.log(e.target.value)} /> */

// useEffect(()=>{})  -- в данном случае, useEffect будет вызываться на каждый рендер компонента
// useEffect(()=>{}, [])  -- в данном случае, useEffect будет вызываться только один раз при маунтинге компента
// useEffect(()=>{}, [какой нибудь вотчер])   --- в данном случае, useEffect будет вызываться каждый раз, когда изменится какой либо из элементов массива зависимостей

// const searcher = () => {
//    console.log(' i am searching >>>', search);
//   const filtered = data.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
//   console.log({ filtered });

//   setCards(filtered);
// }
