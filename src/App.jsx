import React, { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/card_list/card_list.jsx';
import { Footer } from './components/footer/footer.jsx';
import { Header } from './components/header/header.jsx';
import data from './components/data/data.json'

import data from './data/data2.json'
import { api } from "./utils/api";

//создание компонентов для переиспользования
function App() {

  const [hook, setHook] = useState(0);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});

  const [bigdata, setBigdata] = useState([]);


  const clicker = (e) => {
    /* console.log(e) */
  setHook((state) => state = state + 1)
}
  // console.log({search});

  useEffect(() => {
    if (search === undefined) return;
    api.searchProducts(search)
      .then((data) => setCards(data))


    // const filtered = bigdata.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    // setCards(filtered);
  }, [search])

  // console.log('end of working');

  // useEffect(() => {
  //   console.log('2nd useEffect');

  //   setSearch((state) => state + 'a')

  // }, [hook])

  useEffect(() => {

    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, data]) => {
      setUser(userData);
      setCards(data.products);
    });

    // api.getUserInfo().then(data => setUser(data));
    // api.getUserInfo().then().then(()=> api.getProductList().then())
    // api.getProductList().then(data => setCards(data.products));
  }, [])


  console.log({ user });


  return (
    <div className="App">
      <Header setSearch={setSearch}>
        </Header>
<main className='container content'>
        <button id="btn" onClick={clicker}>click me state</button>

        <CardList cards={cards} />
      </main>
      {hook % 2 === 0 ? <Footer /> : <div>NO FOOTER</div>}

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