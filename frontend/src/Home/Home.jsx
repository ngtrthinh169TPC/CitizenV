import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Bar from "../components/charts/Bar";
import Pie from "../components/charts/Pie";

import "./home.scss";

function Home() {
  const [token, setToken] = useCookies(["account-token"]);

  const [dataPie, setDataPie] = useState([]);
  //   const { setUser } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const getDataPie = async () => {
    let tokenCode = "Token " + token["account-token"];
    let response = await fetch(
      "https://citizenv-backend-03.herokuapp.com/citizen/stats/",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: tokenCode,
        },
      }
    );
    if (response.status == 200) {
      let resJson = await response.json();
      console.log(resJson);
      let arr = [];
      let obj = {
        labels: [],
        series: [],
      };
      resJson.education.forEach((element) => {
        obj.labels.push(element.education);
        obj.series.push(element.count);
      });
      arr.push(obj);
      obj = {
        labels: [],
        series: [],
      };
      resJson.gender.forEach((element) => {
        obj.labels.push(element.gender);
        obj.series.push(element.count);
      });
      arr.push(obj);
      obj = {
        labels: [],
        series: [],
      };
      resJson.religious.forEach((element) => {
        obj.labels.push(element.religious);
        obj.series.push(element.count);
      });
      arr.push(obj);
      console.log(arr);
      setDataPie(arr);
    }
  };

  useEffect(() => {
    getDataPie();
    return () => {};
  }, []);

  return (
    <div className="home">
      <div className="content">
        <div className="title">Thống kê các dữ liệu về dân cư</div>
        <div className="top_content">
          {dataPie.length > 0 ? (
            <>
              {dataPie.map((item, index) => (
                <Pie series={item.series} labels={item.labels} key={index} />
              ))}
            </>
          ) : null}
        </div>
        <div className="bottom_content">
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Home;
