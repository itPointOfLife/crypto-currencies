import axios from "axios"
import {TCoin} from '../types'

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        const coins: TCoin[] = data.Data.map((coin: any) => {
          const obj: TCoin = {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: Number(coin.RAW.USD.PRICE.toFixed(3)),
            volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          };
          return obj;
        });
        resolve(coins);
      })
      .catch(error => {
        resolve([])
        console.log(error)
    });
  });
};
