import React, { useState, useEffect } from "react";
import axios from "axios";


const STOCK_URL = `https://cloud.iexapis.com`;
const API_KEY = `pk_f5c0e662d723471ab487b5c9c56c79c2`;




const Facebook = () => {

  const [fb, setFb] = useState('');
  const [company, setCompany] = useState('');
  const [percent, setPercent] = useState('');
  const [close, setClose] = useState('');



  useEffect(() => {
    const search = async () => {

      const { data } = await axios.get(`${STOCK_URL}/stable/stock/fb/quote?token=${API_KEY}`);
      setFb(data.symbol);
      setCompany(data.companyName);
      setPercent((data.changePercent * 100).toFixed(2));
      setClose(data.close);
    }
    search()
  }, []);


  const changeColor = percent < 0 ? "red" : "green";

  return (
    <div className="Company">
      <div className="display-flex">
        <h2>{fb}</h2>
        <p>{close}</p>
      </div>
      <div className="display-flex footer">
        <p>{company}</p>
        <p className={`${changeColor}`}>{percent}%</p>
      </div>
    </div>
  );
}


export default Facebook;