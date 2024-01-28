import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Coin from './Coin';



// APi Link
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en

function App() {
  const [coins, setcoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
        setcoins(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange =  (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }

  // for filtering the coins
  const filteredCoins = coins.filter(coin =>coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
          Search a Currency..
        </h1>
        <form > 
          <input type="text" placeholder='Bitcoin...' className='coin-input' onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin =>{
        return(
          <Coin key = {coin.id}
           name= {coin.name}
           image={coin.image}
           symbol = {coin.symbol}
           price = {coin.current_price}
           marketcap = {coin.market_cap}
           priceChange = {coin.price_change_percentage_24th}
           volume = {coin.total_volume}
           />
        )
      })}
    </div>
    </>
  )
}

export default App
