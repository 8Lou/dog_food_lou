import React, { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/card_list/card_list.jsx';
import { Footer } from './components/footer/footer.jsx';
import { Header } from './components/header/header.jsx';
/* import data from './components/data/data.json' */

import { useDebounce } from './hooks/hooks'
import { api, getProductList } from "./utils/api";

// const [example, setExample] = useState(); нельзя!

//создание компонентов для переиспользования
function App() {

  // состояние карточек
  /* объявляется хук с первоначальным значением 0 */
  /* const [hook, setHook] = useState(0); */
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});

  /* const [bigdata, setBigdata] = useState([]); */

  /* const clicker = (e) => { */
  /* console.log(e) */
  /* setHook((state) => state = state + 1) /* Хук видит изменение состояния стэйт - идет обратно перерендерить
} */
  // console.log({search});

  /* useEffect запустился когда вся логика отработала */
  /* если рядом положить массив зависимостей, напр[search], после изменений в нем остработает вложенная функция. Т.е.второй раз */

  /* фильтрация картинок в АПИ по ай ди авторов */
  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '644573ee3291d790b3073d8d')
  }

  const debounceValueInApp = useDebounce(search)


  const handleProductLike = async (product, isLiked) => {
    const updatedCard = await api.changeProductLike(product._id, isLiked);

    //на каждый элемент в массиве, если обновлен, то найти и вернуть обновленную карточку, иниче ничего
    const newCards = cards.map(e => e._id === updatedCard._id ? updatedCard : e);
    const index = cards.findIndex(e => e._id === updatedCard._id);
    if (index !== -1) {
      setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index + 1)]) // массив обрезать от 0-индекса, вставить
    }
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
  }
  useEffect(() => {

    /*if (search === undefined) return;
    api.searchProducts(search)
      .then((data) => setCards(data)) */

    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp)
      .then((data) => setCards(filteredCards(data)))

  }, [debounceValueInApp])

  useEffect(() => {
    Promise.all([api.getUserInfo(), getProductList()]).then(([userData, data]) => {
      setUser(userData);
      setCards(filteredCards(data.products));
    });

  }, [])

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

  return (
    <div className="App">
      <Header setSearch={setSearch}>
      </Header>
      <main className='container content'>
        {/* <button id="btn" onClick={clicker}>click me state</button> */}

        <CardList cards={cards} />
      </main>
      {/* {hook % 2 === 0 ?  */}
      <Footer />

    </div>
  );
}

export default App;

{/* <button id="btn" onClick={clicker}>click me state</button>
<input onChange={(e) => console.log(e.target.value)} /> */}

{/* <button id="btn" onClick={clicker}>click me state</button> */ }


// useEffect(()=>{})  -- в данном случае, useEffect будет вызываться на каждый рендер компонента 
// useEffect(()=>{}, [])  -- в данном случае, useEffect будет вызываться только один раз при маунтинге компента
// useEffect(()=>{}, [какой нибудь вотчер])   --- в данном случае, useEffect будет вызываться каждый раз, когда изменится какой либо из элементов массива зависимостей

  // const searcher = () => {
  //    console.log(' i am searching >>>', search);
  //   const filtered = data.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  //   console.log({ filtered });

  //   setCards(filtered);
  // }