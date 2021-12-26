import React, { useState, useEffect, useRef, useContext } from "react";
import "./populationlist.scss";
import { Table, Button, Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ModalInfo from "../components/modals/ModalInfo";
import InfoEdit from "../components/modals/InfoEdit";
import { UserContext } from "../UserContext";

const PopulationList = () => {
  const [listAcc, setListAcc] = useState([]);
  const [token, setToken] = useCookies(["account-token"]);
  const [showData, setShowData] = useState({});
  const [fillterData, setFillterData] = useState({});
  const [loading, setLoading] = useState(false);
  const modal = useRef();
  const newRef = useRef();
  const { user } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const getList = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const openModal = (item) => {
    setShowData(item);
    modal.current.open();
    modal.current.refesh(item);
    console.log(modal.current);
  };

  const closeModal = () => {
    modal.current.close();
  };

  const openEditModal = (item) => {
    newRef.current.open();
    newRef.current.refesh(item);
  };

  const deleteInfo = async (item) => {
    let tokenCode = "Token " + token["account-token"];
    try {
      let data = {
        object_id: item.object_id,
      };

      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/citizen/",
        {
          method: "DELETE",
          headers: {
            authorization: tokenCode,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 204
      ) {
        await getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const closeEdit = () => {
    newRef.current.close();
  };

  return (
    <div className="population">
      <div className="title">
        <h3>Danh sách dân cư trong địa bàn</h3>
      </div>

      {!loading ? (
        <>
          <div className="fillter_div"></div>
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
                      {user.permission == "B1" || user.permission == "B2" ? (
                        <th>Chỉnh sửa</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {listAcc.map((item, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item.full_name}</td>
                        <td>
                          {moment(item.date_of_birth).format("DD/MM/YYYY")}
                        </td>
                        <td>{item.gender == "Male" ? "Nam" : "Nữ"}</td>
                        <td>{item.citizen_id}</td>
                        <td>{item.permanent_address}</td>
                        {user.permission == "B1" || user.permission == "B2" ? (
                          <>
                            <td>
                              <Button onClick={() => openModal(item)}>
                                <i className="bx bx-show" />
                              </Button>
                            </td>
                            <td>
                              <div className="edit">
                                <Button onClick={() => openEditModal(item)}>
                                  <i className="bx bx-pencil" />
                                </Button>
                                <Button onClick={() => deleteInfo(item)}>
                                  <i className="bx bx-trash" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              "Chưa có thông tin người dân"
            )}
          </div>
        </>
      ) : (
        <Spinner animation="border" />
      )}
      <ModalInfo ref={modal} data={showData} handleClose={closeModal} />
      <InfoEdit
        ref={newRef}
        data={listAcc ? listAcc[0] : null}
        handleClose={closeEdit}
        token={token["account-token"]}
      />
    </div>
  );
};

export default PopulationList;
