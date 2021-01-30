import React, { useState, useEffect } from "react";
import Nasdaq from "./Nasdaq";
import Spy from "./Spy";
import Facebook from "./Facebook";
import Snap from "./Snap";
import axios from 'axios'



const BASE_URL = `https://cloud.iexapis.com`;
const KEY = `pk_f5c0e662d723471ab487b5c9c56c79c2`;




const Stocks = () => {


  const [stock, setStock] = useState('');
  const [result, setResult] = useState('');



  useEffect(() => {
    const search = async () => {

      const { data } = await axios.get(`${BASE_URL}/stable/stock/${stock}/quote?token=${KEY}`);

      setResult(data)
      console.log(data)
    }


    const timeOut = setTimeout(() => {
      search();
    }, 500);



    return () => {
      clearTimeout(timeOut);
    };

  }, [stock]);


  const display = () => {
    const changeColor = result.changePercent < 0 ? "red" : "green";
    if (result) {
      return (
        <div className="Company">
          <div className="display-flex">
            <h2>{result.symbol}</h2>
            <p>{result.close}</p>
          </div>
          <div className="display-flex footer">
            <p>{result.companyName}</p>
            <p className={`${changeColor}`}>{(result.changePercent * 100).toFixed(2)}%</p>
          </div>
        </div>
      );
    }
  }


  return (
    <div className="stocks">
      <div className="">
        <Nasdaq />
        <Spy />
        <Facebook />
        <Snap />
        <div className="other-flex">
          <input
            value={stock}
            onChange={e => setStock(e.target.value)}
            type="Search"
            placeholder="Search"
          />
        </div>
      </div>
      <div>
        {display()}
      </div>
    </div>
  );
}

export default Stocks;