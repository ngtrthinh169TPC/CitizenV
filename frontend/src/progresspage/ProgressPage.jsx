import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import "./progresspage.scss";

const ProgressPage = () => {
  const [listAcc, setListAcc] = useState([]);
  const [token, setToken] = useCookies(["account-token"]);
  const [tienDo, setTienDo] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const getListAcc = async () => {
    let tokenCode = "Token " + token["account-token"];
    try {
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/",
        {
          method: "GET",
          headers: {
            authorization: tokenCode,
          },
          body: null,
        }
      );

      if (response.status == 200 || response.status == 201) {
        let resJson = await response.json();
        console.log({ resJson });
        setListAcc(resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const progress = async () => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/progress/",
        {
          method: "GET",
          headers: {
            authorization: tokenCode,
          },
        }
      );
      if (response.status == 200) {
        let resJson = await response.json();
        setTienDo(resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListAcc();
    progress();
    return () => {};
  }, []);

  return (
    <div className="progress_div">
      <div className="title">
        <h3>Tiến độ khảo sát</h3>
      </div>
      <div className="tien_do">
        <h5>
          Tiến độ khảo sát: {tienDo.completed}/{tienDo.total}
        </h5>
      </div>
      <div className="content">
        {listAcc.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Đơn vị</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listAcc.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.classification + " " + item.name_of_unit}</td>
                  <td>
                    {item.completed
                      ? "Đã hoàn thành khảo sát"
                      : "Chưa hoàn thành khảo sát"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="no_content">Không có thông tin!</div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
