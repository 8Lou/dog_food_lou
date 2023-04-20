import { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/card/card.jsx';
import { Footer } from './components/footer/footer.jsx';
import { Header } from './components/header/header.jsx';
import data from './components/data/data.json'

//создание компонентов для переиспользования
function App() {
  const [hook, setHook] = useState(0);
  const clicker = (e) => {
    /* console.log(e) */
  setHook((state) => state = state + 1)
}
  return (
    <div className="App">
      <Header myTitle={'Title'} attributes={{name: 'all'}}>
        <Header />
<main className='container content'>

</main>
        <CardList cards={data}/>
        { }
        <Footer />
    </div>
  );
}

export default App;
