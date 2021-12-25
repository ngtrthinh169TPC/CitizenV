import React, { useState, useEffect, useRef } from "react";
import "./populationlist.scss";
import { Table, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ModalInfo from "../components/modals/ModalInfo";

const PopulationList = () => {
  const [listAcc, setListAcc] = useState([]);
  const [token, setToken] = useCookies(["account-token"]);
  const [showData, setShowData] = useState({});
  const modal = useRef();

  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const getList = async () => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/citizen/",
        {
          method: "GET",
          headers: {
            authorization: tokenCode,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        let resJson = await response.json();
        console.log(resJson);
        setListAcc(resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (item) => {
    setShowData(item);
    modal.current.open();
    modal.current.refesh(item);
  };

  const closeModal = () => {
    modal.current.close();
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="population">
      <div className="title">
        <h3>Danh sách dân cư trong địa bàn</h3>
      </div>
      <div className="content">
        {listAcc.length > 0 ? (
          <div className="table-wrapper-scroll my-custom-scrollbar">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Số CMND/CCCD</th>
                  <th>Địa chỉ thường trú</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {listAcc.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.full_name}</td>
                    <td>{moment(item.date_of_birth).format("DD/MM/YYYY")}</td>
                    <td>{item.gender == "Male" ? "Nam" : "Nữ"}</td>
                    <td>{item.citizen_id}</td>
                    <td>{item.permanent_address}</td>
                    <td>
                      <Button onClick={() => openModal(item)}>
                        <i className="bx bx-show" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          "Chưa có thông tin người dân"
        )}
      </div>
      <ModalInfo ref={modal} data={showData} handleClose={closeModal} />
    </div>
  );
};

export default PopulationList;
