import React, { useState, useEffect, useRef, useContext } from "react";
import "./populationlist.scss";
import { Table, Button, Spinner, Row, Col, Form } from "react-bootstrap";
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
  const [dataA1, setDataA1] = useState({
    disable: false,
    id: "",
    title: "",
    list: [],
  });
  const [dataA2, setDataA2] = useState({
    disable: false,
    title: "",
    id: "",
    list: [],
  });
  const [dataA3, setDataA3] = useState({
    disable: false,
    title: "",
    id: "",
    list: [],
  });
  const [dataB1, setDataB1] = useState({
    disable: false,
    title: "",
    id: "",
    list: [],
  });
  const [dataB2, setDataB2] = useState({
    disable: false,
    title: "",
    id: "",
    list: [],
  });
  const [loading, setLoading] = useState(false);
  const modal = useRef();
  const newRef = useRef();
  const { user } = useContext(UserContext);

  const history = useHistory();

  const setupFiller = () => {};

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

  const setDefauleData = () => {
    switch (user.permission) {
      case "A1":
        setDataA1({
          disable: true,
          title: user.account_id,
          list: [],
          id: user.account_id,
        });
        break;

      case "A2":
        setDataA2({
          disable: true,
          title: user.name_of_unit,
          list: [],
          id: user.account_id,
        });
        break;

      case "A3":
        setDataA3({
          disable: true,
          title: user.name_of_unit,
          list: [],
          id: user.account_id,
        });
        break;

      case "B1":
        setDataB1({
          disable: true,
          title: user.name_of_unit,
          list: [],
          id: user.account_id,
        });
        break;

      case "B2":
        setDataB2({
          disable: true,
          title: user.name_of_unit,
          list: [],
          id: user.account_id,
        });
        break;

      default:
        return;
    }
  };

  const getAncestors = async () => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/ancestors/",
        {
          method: "GET",
          headers: {
            authorization: tokenCode,
          },
        }
      );
      if (response.status == 200) {
        let resJson = await response.json();
        console.log(resJson);
        if (resJson.A1) {
          let obj = {
            id: resJson.A1[1],
            title: resJson.A1[0],
            disable: true,
            list: [],
          };
          setDataA1(obj);
        }
        if (resJson.A2) {
          let obj = {
            id: resJson.A2[1],
            title: resJson.A2[0],
            disable: true,
            list: [],
          };
          setDataA2(obj);
        }
        if (resJson.A3) {
          let obj = {
            id: resJson.A3[1],
            title: resJson.A3[0],
            disable: true,
            list: [],
          };
          setDataA3(obj);
        }
        if (resJson.B1) {
          let obj = {
            id: resJson.B1[1],
            title: resJson.B1[0],
            disable: true,
            list: [],
          };
          setDataB1(obj);
        }
        if (resJson.B2) {
          let obj = {
            id: resJson.B2[1],
            title: resJson.B2[0],
            disable: true,
            list: [],
          };
          setDataB2(obj);
        }
        setDefauleData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setData = (data, permistion) => {
    switch (permistion) {
      case "A1":
        setDataA2({ ...dataA2, list: data });
        break;

      case "A2":
        setDataA3({ ...dataA3, list: data });
        break;

      case "A3":
        setDataB1({ ...dataB1, list: data });
        break;

      case "B1":
        setDataB2({ ...dataB2, list: data });
        break;

      default:
        return;
    }
  };

  const getChildAcc = async () => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let data = {
        account_id: user.account_id,
      };

      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/find/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status == 200) {
        let resJson = await response.json();
        setData(resJson, user.permission);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChildOfSelected = async (permistion, id) => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let data = {
        account_id: id,
      };

      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/find/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status == 200) {
        let resJson = await response.json();
        switch (permistion) {
          case "A3":
            setDataA3({ ...dataA3, list: resJson });
            break;
          case "B1":
            setDataB1({ ...dataB1, list: resJson });
            break;
          case "B2":
            setDataB2({ ...dataB2, list: resJson });
            break;
          default:
            return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterListAcc = async () => {
    setLoading(true);
    let id;
    if (dataB2.id) {
      id = dataB2.id;
    } else if (dataB1.id) {
      id = dataB1.id;
    } else if (dataA3.id) {
      id = dataA3.id;
    } else if (dataA2.id) {
      id = dataA2.id;
    } else {
      id = dataA1.id;
    }
    // if (id.length % 2 != 0) {
    //   id = "0" + id;
    // }
    console.log({ id });
    let tokenCode = "Token " + token["account-token"];
    let data = {
      account_id: id,
    };

    try {
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/citizen/find/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status == 200) {
        let resJson = await response.json();
        setListAcc(resJson);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const selected = (permission, event) => {
    console.log(event.target.value);
    switch (permission) {
      case "A2":
        setDataA2({ ...dataA2, id: event.target.value });
        setDataA3({ ...dataA3, id: "" });
        setDataB1({ ...dataB1, id: "" });
        setDataB2({ ...dataB2, id: "" });
        getChildOfSelected("A3", event.target.value);
        break;
      case "A3":
        setDataA3({ ...dataA3, id: event.target.value });
        setDataB1({ ...dataB1, id: "" });
        setDataB2({ ...dataB2, id: "" });
        getChildOfSelected("B1", event.target.value);
        break;

      case "B1":
        setDataB1({ ...dataB1, id: event.target.value });
        setDataB2({ ...dataB2, id: "" });
        getChildOfSelected("B2", event.target.value);
        break;

      case "B2":
        setDataB2({ ...dataB2, id: event.target.value });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getList();
    getAncestors();
    getChildAcc();
    console.log(dataA2);
  }, []);

  const closeEdit = () => {
    newRef.current.close();
  };

  return (
    <div className="population">
      <div className="title">
        <h3>Danh sách dân cư trong địa bàn</h3>
      </div>

      <div className="fillter_div">
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Select
              aria-label="Default select example"
              disabled={dataA2.disable ? dataA2.disable : false}
              value={dataA2.id}
              onChange={(event) => selected("A2", event)}
            >
              <option>
                {dataA2.title ? dataA2.title : "Chọn Tỉnh/Thành phố"}
              </option>
              {dataA2.disable ? null : (
                <>
                  {dataA2.list.map((item, index) => (
                    <option key={index} value={item.account_id}>
                      {item.name_of_unit}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Select
              aria-label="Default select example"
              disabled={dataA3.disable ? dataA3.disable : false}
              value={dataA3.id}
              onChange={(event) => selected("A3", event)}
            >
              <option>{dataA3.title ? dataA3.title : "Chọn Quận/Huyện"}</option>
              {dataA3.disable ? null : (
                <>
                  {dataA3.list.map((item, index) => (
                    <option key={index} value={item.account_id}>
                      {item.name_of_unit}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Select
              aria-label="Default select example"
              disabled={dataB1.disable ? dataB1.disable : false}
              value={dataB1.id}
              onChange={(event) => selected("B1", event)}
            >
              <option>{dataB1.title ? dataB1.title : "Chọn Phường/Xã"}</option>
              {dataB1.disable ? null : (
                <>
                  {dataB1.list.map((item, index) => (
                    <option key={index} value={item.account_id}>
                      {item.name_of_unit}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Select
              aria-label="Default select example"
              disabled={dataB2.disable ? dataB2.disable : false}
              value={dataB2.id}
              onChange={(event) => selected("B2", event)}
            >
              <option>
                {dataB2.title ? dataB2.title : "Chọn Thôn/Phố/Bản"}
              </option>
              {dataB2.disable ? null : (
                <>
                  {dataB2.list.map((item, index) => (
                    <option key={index} value={item.account_id}>
                      {item.name_of_unit}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Button onClick={filterListAcc}>
              <i className="bx bx-search" />
            </Button>
          </Form.Group>
        </Row>
      </div>

      {!loading ? (
        <>
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
                        <td>
                          <Button onClick={() => openModal(item)}>
                            <i className="bx bx-show" />
                          </Button>
                        </td>
                        {user.permission == "B1" || user.permission == "B2" ? (
                          <>
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
